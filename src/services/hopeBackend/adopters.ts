import { AxiosInstance, isAxiosError } from 'axios';
import { hopeBackendUrl } from './url';
import toast from 'react-hot-toast';

export async function findOneAdopter(axios: AxiosInstance, id: number) {
  const res = await axios.get<Adopter>(hopeBackendUrl.adopters.findOne(id));
  return res.data;
}

export async function findAllAdopters(
  axios: AxiosInstance,
  params?: FilterAdopterDto
) {
  try {
    const res = await axios.get<PaginationResponse<Adopter>>(
      hopeBackendUrl.adopters.find(params)
    );
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.response?.data?.message;

      if (status === 409) {
        if (message === 'Adopter deleted') {
          toast.error('El adoptante esta eliminado.');
        } else if (message == 'Adopter not have evaluations') {
          toast.error('El adoptante debe tener evaluaciones.');
        } else {
          toast.error('Ya existe un adopter con ese nombre.');
        }
      }
    }
  }
}

export async function createAdopters(
  axios: AxiosInstance,
  body?: CreateAdopterDto
) {
  try {
    const res = await axios.post<Adopter>(hopeBackendUrl.adopters.create, body);
    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      const status = err.response?.status;
      const message = err.response?.data?.message;
      const error = err.response?.data?.error;
      console.log({ err });
      if (status === 409) {
        if (error === 'Duplicate') {
          toast.error('Ya registrate a este usaurio o lo eliminaste');
        } else if (message === 'Adopter deleted') {
          toast.error('El adoptante esta eliminado.');
        } else if (message == 'Adopter not have evaluations') {
          toast.error('El adoptante debe tener evaluaciones.');
        } else {
          toast.error('Ya existe un adopter con ese nombre.');
        }
      }
    }
  }
}

export async function updateAdopter(
  axios: AxiosInstance,
  id: number,
  body?: UpdateAdopterDto
) {
  const res = await axios.put<Adopter>(
    hopeBackendUrl.adopters.update(id),
    body
  );
  return res.data;
}

export async function deleteAdopter(axios: AxiosInstance, id: number) {
  const res = await axios.delete<Adopter>(hopeBackendUrl.adopters.delete(id));
  return res.data;
}
