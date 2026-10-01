import axios from 'axios';

const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1').replace(/\/+$/, '');

// Access token lives in memory only; the refresh token is an httpOnly cookie the browser sends itself.
let accessToken = null;
let onSessionEnd = () => {};

export const setAccessToken = (token) => {
  accessToken = token;
};
export const setSessionEndHandler = (fn) => {
  onSessionEnd = fn;
};

export const api = axios.create({ baseURL: API_URL, withCredentials: true, timeout: 15000 });

api.interceptors.request.use((config) => {
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

// One refresh at a time; requests that 401 while it's in flight wait in the queue.
let refreshing = null;

const NO_REFRESH = ['/auth/login', '/auth/refresh', '/auth/logout'];

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    const status = error.response?.status;

    if (status !== 401 || !original || original._retried || NO_REFRESH.some((p) => original.url?.startsWith(p))) {
      return Promise.reject(error);
    }
    original._retried = true;

    try {
      refreshing ??= api.post('/auth/refresh').finally(() => {
        refreshing = null;
      });
      const { data } = await refreshing;
      setAccessToken(data.data.accessToken);
      return api(original);
    } catch (refreshError) {
      setAccessToken(null);
      onSessionEnd();
      return Promise.reject(refreshError);
    }
  },
);

export const errorMessage = (err, fallback = 'Something went wrong. Please try again.') =>
  err?.response?.data?.message || fallback;
