import { AxiosInstance, isAxiosError } from 'axios';
import { hopeBackendUrl } from './url';
import toast from 'react-hot-toast';

export async function findOneAdoption(axios: AxiosInstance, id: string) {
  const res = await axios.get<Adoption>(hopeBackendUrl.adoptions.findOne(id));
  return res.data;
}

export async function findAllAdoptions(
  axios: AxiosInstance,
  params?: FilterAdoptionDto
) {
  try {
    const res = await axios.get<PaginationResponse<Adoption>>(
      hopeBackendUrl.adoptions.find(params)
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

export async function createAdoption(
  axios: AxiosInstance,
  body?: CreateAdoptionDto
) {
  try {
    const res = await axios.post<Adoption>(
      hopeBackendUrl.adoptions.create,
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

export async function evaluationAdoption(
  axios: AxiosInstance,
  id: string,
  body?: UpdateAdoptionEvaluateDto
) {
  const res = await axios.patch<Adoption>(
    hopeBackendUrl.adoptions.evaluate(id),
    body
  );
  return res.data;
}

export async function linkAnimalAdoption(
  axios: AxiosInstance,
  id: string,
  body?: UpdateLinkAnimalWithAdoption
) {
  const res = await axios.patch<Adoption>(
    hopeBackendUrl.adoptions.linkAnimal(id),
    body
  );
  return res.data;
}

export async function completeAdoption(
  axios: AxiosInstance,
  id: string,
  body?: UpdateCompleteRequestAdoption
) {
  const res = await axios.patch<Adoption>(
    hopeBackendUrl.adoptions.completeAdoption(id),
    body
  );
  return res.data;
}
