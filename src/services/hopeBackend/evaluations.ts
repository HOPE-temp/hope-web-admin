import { AxiosInstance, isAxiosError } from 'axios';
import { hopeBackendUrl } from './url';
import toast from 'react-hot-toast';

export async function findOneEvaluation(axios: AxiosInstance, id: string) {
  const res = await axios.get<Evaluation>(
    hopeBackendUrl.evaluations.findOne(id)
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
