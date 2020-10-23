import { LoginInfoType } from '@/pages/login/login';
import { request } from 'umi';

export const login = (data: LoginInfoType) =>
  request('/api/login', { method: 'post', data });

export const logout = () => request('/api/login', { method: 'post' });
