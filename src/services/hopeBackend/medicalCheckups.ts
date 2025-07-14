import { AxiosInstance, isAxiosError } from 'axios';
import { hopeBackendUrl } from './url';
import toast from 'react-hot-toast';

export async function findOneMedicalCheckup(axios: AxiosInstance, id: number) {
  const res = await axios.get<MedicalCheckup>(
    hopeBackendUrl.medical_checkups.findOne(id)
  );
  return res.data;
}

export async function findAllMedicalCheckups(
  axios: AxiosInstance,
  params?: FilterMedicalCheckupDto
) {
  try {
    const res = await axios.get<PaginationResponse<MedicalCheckup>>(
      hopeBackendUrl.medical_checkups.find(params)
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

export async function createMedicalCheckup(
  axios: AxiosInstance,
  body?: CreateMedicalCheckupDto
) {
  try {
    const res = await axios.post<MedicalCheckup>(
      hopeBackendUrl.medical_checkups.create,
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
