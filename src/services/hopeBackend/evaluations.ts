import { AxiosInstance, isAxiosError } from 'axios';
import { hopeBackendUrl } from './url';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

export async function findOneEvaluation(axios: AxiosInstance, id: string) {
  const res = await axios.get<Evaluation>(
    hopeBackendUrl.evaluations.findOne(id)
  );
  return res.data;
}

export async function findEvaluationsByAdopter(
  axios: AxiosInstance,
  id: number
) {
  const res = await axios.get<Evaluation[]>(
    hopeBackendUrl.evaluations.findByAdopter(id)
  );
  return res.data;
}

export async function createEvaluation(
  axios: AxiosInstance,
  id: number,
  body?: CreateEvaluationDto
) {
  try {
    const res = await axios.post<Evaluation>(
      hopeBackendUrl.evaluations.create(id),
      body
    );
    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      const status = err.response?.status;
      const message = err.response?.data?.message;
      const error = err.response?.data?.error;
      console.log({ err });
      if (status === 409) {
        if (error === 'Recently made') {
          toast.error(
            'Ya registro un evaluacion, intentar el ' +
              format(new Date(message), 'yyyy-MM-dd hh:mm')
          );
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
