import { useAuthStore } from '../store/useAuthStore';

/* Backend API client
   Change API_BASE to your deployed backend URL.
   Override via VITE_API_BASE env variable. */

const API_BASE = import.meta.env.VITE_API_BASE || 'https://shayan-ali832-yafbackend.vercel.app';

function getToken() {
  try {
    const raw = localStorage.getItem('yousafzai-auth');
    const state = raw ? JSON.parse(raw)?.state : null;
    if (state?.token) return state.token;
  } catch {}
  try {
    return useAuthStore.getState().token;
  } catch {}
  return null;
}

async function request(endpoint, { method = 'GET', body, headers = {}, formData } = {}) {
  const h = { ...headers };
  const token = getToken();
  if (token) h['Authorization'] = `Bearer ${token}`;

  const opts = { method, headers: h };

  if (formData) {
    opts.body = formData;
    delete h['Content-Type'];
  } else if (body !== undefined) {
    h['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(body);
  }

  const res = await fetch(`${API_BASE}${endpoint}`, opts);

  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try { const e = await res.json(); msg = e.error || e.message || msg; } catch {}
    const err = new Error(msg);
    err.status = res.status;
    throw err;
  }

  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  login: (email, password) =>
    request('/api/auth/login', { method: 'POST', body: { email, password } }),

  logout: () =>
    request('/api/auth/logout', { method: 'POST' }),

  getCmsAll: () =>
    request('/api/cms/all'),

  getCmsSection: (section) =>
    request(`/api/cms/${section}`),

  updateCmsSection: (section, data) =>
    request(`/api/cms/${section}`, { method: 'PUT', body: data }),

  updateCmsAll: (data) =>
    request('/api/cms/all', { method: 'PUT', body: data }),

  submitQuote: (quoteData) =>
    request('/api/quotes', { method: 'POST', body: quoteData }),

  uploadImage: (file) => {
    const fd = new FormData();
    fd.append('file', file);
    return request('/api/upload', { method: 'POST', formData: fd });
  },
};
