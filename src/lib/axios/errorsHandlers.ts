import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { NextRouter, useRouter } from 'next/router';
import toast from 'react-hot-toast';

type TypeErrorDict = Record<number | string, () => void>;

export const dictError: TypeErrorDict = {
  400: () => {
    toast.error('Solicitud incorrecta: Revisa los campos enviados');
  },
  401: () => {},
  500: () => {
    toast.error('Error desconocido: Algo salió mal.');
  },
  0: () => console.error('Error: sin gestion'),
};

export const errorsHttpHandlers = (dictError: TypeErrorDict) => {};

export const errorHttp401 = (router: AppRouterInstance) => {
  return () => {
    router.push('/login');
    toast.error('Iniciar sesion');
  };
};

export function dictErrorWith401(router: AppRouterInstance): TypeErrorDict {
  const error401 = errorHttp401(router);
  return {
    401: error401,
  };
}
