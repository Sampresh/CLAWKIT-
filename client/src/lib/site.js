const stripSlash = (url) => url.replace(/\/+$/, '');

export const site = {
  name: 'CLAWKIT',
  tagline: 'The seizure tracker for dogs',
  description:
    'CLAWKIT helps you log your dog’s seizures in seconds, track medication, spot patterns, and share clear reports with your vet. Available on iPhone and Android.',
  url: stripSlash(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  email: 'pawtrack@ausasi.com',
  appStoreUrl: process.env.NEXT_PUBLIC_APP_STORE_URL || '#download',
  playStoreUrl: process.env.NEXT_PUBLIC_PLAY_STORE_URL || '#download',
  // Contact and newsletter forms need the API; without it the site runs fully static.
  apiEnabled: Boolean(process.env.NEXT_PUBLIC_API_URL),
};

export const mainNav = [
  { label: 'Features', href: '/#features' },
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];
