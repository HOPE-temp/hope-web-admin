import axios, { AxiosInstance } from 'axios';
import { env } from '@/config/env';
import { dictError, dictErrorWith401 } from './axios/errorsHandlers';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

class Axios {
  axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: env.backend.hostname,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.initialize();
  }

  initialize() {
    this.axiosInstance.interceptors.response.use(
      res => res,
      err => {
        const status = err.response?.status;
        if (typeof window !== 'undefined' && status) {
          if (dictError[status]) {
            dictError[status]();
          }
        }
        return Promise.reject(err);
      }
    );
  }

  set404(router: AppRouterInstance) {
    this.axiosInstance.interceptors.response.use(
      res => res,
      err => {
        const status = err.response?.status;
        // Si ya se manejó localmente, no hagas nada

        if (typeof window !== 'undefined') {
          if (status === 401) {
            dictErrorWith401(router)[status]();
          }
        }

        return Promise.reject(err);
      }
    );
  }

  setAuthorization(token: string) {
    this.axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  deleteAuthorization(router: AppRouterInstance) {
    router.push('/login');
    delete this.axiosInstance.defaults.headers.common.Authorization;
  }
}

export default Axios;
