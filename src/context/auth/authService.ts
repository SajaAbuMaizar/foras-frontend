import { api } from '@/lib/axios';

export const fetchUser = async () => {
  const res = await api.get('/api/auth/me', {
    validateStatus: status => status < 500,
  });

  if (res.status === 200) return res.data;
  return null;
};

export const loginUser = async (phone: string, password: string) => {
  return await api.post('/api/auth/login', { phone, password });
};

export const logoutUser = async () => {
  return await api.post('/api/auth/logout');
};
