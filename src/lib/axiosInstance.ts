import axios from 'axios';
import { env } from '@/config/env';
import toast from 'react-hot-toast';

const axiosInstance = axios.create({
  baseURL: env.backend.hostname,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
axiosInstance.interceptors.response.use(
  res => res,
  err => {
    const status = err.response?.status;
    // Si ya se manejó localmente, no hagas nada

    if (typeof window !== 'undefined') {
      switch (status) {
        case 400:
          toast.error('Solicitud incorrecta: Revisa los campos enviados');
          break;
        // case 401:
        //   toast.error('No autorizado: Debes iniciar sesión.');
        //   break;
        case 200:
          toast.success('¡Todo bien!: Operación completada con éxito.');
          break;
        case 500:
          toast.error('Error desconocido: Algo salió mal.');
          break;
        default:
          console.error('Error: sin gestion');
      }
    }

    return Promise.reject(err);
  }
);

export const isAxiosError = axios.isAxiosError;

export { axiosInstance as axios };
