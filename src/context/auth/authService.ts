import { api } from '@/lib/axios';

export const fetchUser = async () => {
  const res = await api.get('/api/me', {
    validateStatus: status => status < 500,
  });

  if (res.status === 200) return res.data;
  return null;
};

export const loginCandidate = async (phone: string, password: string) => {
  return await api.post('/api/auth/candidate/login', { phone, password });
};

export const logout = async () => {
  return await api.post('/api/auth/candidate/logout');
};
