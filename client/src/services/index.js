import { api } from './api';

const data = (res) => res.data.data;
const message = (res) => res.data.message;

export const authService = {
  login: (body) => api.post('/auth/login', body).then(data),
  refresh: () => api.post('/auth/refresh').then(data),
  logout: () => api.post('/auth/logout'),
  me: () => api.get('/auth/me').then(data),
  forgotPassword: (body) => api.post('/auth/forgot-password', body).then(message),
  resetPassword: (body) => api.post('/auth/reset-password', body).then(message),
};

export const contentService = {
  sendContact: (body) => api.post('/content/contact', body).then(message),
  subscribe: (body) => api.post('/content/newsletter', body).then(message),
};

export const adminService = {
  stats: () => api.get('/admin/stats').then(data),
  messages: (params) => api.get('/admin/messages', { params }).then(data),
  markMessage: (id, read) => api.patch(`/admin/messages/${id}`, { read }).then(data),
  deleteMessage: (id) => api.delete(`/admin/messages/${id}`),
  subscribers: (params) => api.get('/admin/subscribers', { params }).then(data),
  deleteSubscriber: (id) => api.delete(`/admin/subscribers/${id}`),
  exportSubscribers: () => api.get('/admin/subscribers/export', { responseType: 'blob' }).then((r) => r.data),
};
