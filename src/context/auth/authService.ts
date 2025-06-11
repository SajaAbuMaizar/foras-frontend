import { api } from '@/lib/axios';
import { User } from './types';

export const fetchUser = async () => {
  const res = await api.get('/api/user/me', {
    validateStatus: status => status < 500,
  });
  console.log('fetchUser response:', res);

  if (res.status === 200) return res.data as User;
  return null;
};

export const loginCandidate = async (phone: string, password: string) => {
  return await api.post('/api/auth/candidate/login', { phone, password });
};

export const logout = async () => {
  return await api.post('/api/auth/candidate/logout');
};
