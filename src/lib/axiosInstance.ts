// lib/axios.ts
import axios from 'axios'

import {env} from '@/config/env'

console.log(env)
const axiosInstance = axios.create({
  baseURL: env.backend.hostname,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptores de error
// axiosInstance.interceptors.response.use(
//   res => res,
//   error => {
//     const status = error.response?.status

//     // Si estás en cliente, puedes usar Zustand o eventos
//     if (typeof window !== 'undefined') {
//       switch (status) {
//         case 400:
//           console.error('Solicitud incorrecta')
//           break
//         case 401:
//           console.error('No autorizado')
//           break
//         case 403:
//           console.error('Prohibido')
//           break
//         case 500:
//           console.error('Error del servidor')
//           break
//         default:
//           console.error('Error desconocido')
//       }
//     }

//     return Promise.reject(error)
//   }
// )

export default axiosInstance