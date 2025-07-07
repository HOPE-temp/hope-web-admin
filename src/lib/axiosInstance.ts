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


export default axiosInstance