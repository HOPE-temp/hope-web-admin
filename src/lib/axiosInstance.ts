import axios from 'axios';
import { env } from '@/config/env';

const axiosInstance = axios.create({
  baseURL: env.backend.hostname,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const isAxiosError = axios.isAxiosError;

export { axiosInstance as axios };
