import { AxiosInstance, isAxiosError } from 'axios';
import { hopeBackendUrl } from './url';
import toast from 'react-hot-toast';

export async function findOneFollowup(axios: AxiosInstance, id: string) {
  const res = await axios.get<AdoptedAnimal>(
    hopeBackendUrl.followups.findOne(id)
  );
  return res.data;
}

export async function findAllFollowups(
  axios: AxiosInstance,
  params?: FilterFollowupDto
) {
  try {
    const res = await axios.get<PaginationResponse<AdoptedAnimal>>(
      hopeBackendUrl.followups.find(params)
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

export async function createFollowup(
  axios: AxiosInstance,
  body?: CreateFollowupDto
) {
  try {
    const res = await axios.post<AdoptedAnimal>(
      hopeBackendUrl.followups.create,
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

export async function rescheduleFollowup(
  axios: AxiosInstance,
  id: string,
  body?: UpdateRescheduleFollowup
) {
  const res = await axios.patch<AdoptedAnimal>(
    hopeBackendUrl.followups.rescheduleFollowup(id),
    body
  );
  return res.data;
}

export async function checkupScheduleFollowup(
  axios: AxiosInstance,
  id: string,
  body?: UpdateCheckupFollowup
) {
  const res = await axios.patch<AdoptedAnimal>(
    hopeBackendUrl.followups.checkupSchedule(id),
    body
  );
  return res.data;
}

export async function completeFollowup(
  axios: AxiosInstance,
  id: string,
  body?: UpdateCompleteRequestFollowup
) {
  const res = await axios.patch<AdoptedAnimal>(
    hopeBackendUrl.followups.completeFollowup(id),
    body
  );
  return res.data;
}

export async function cancelFollowup(
  axios: AxiosInstance,
  id: string,
  body?: UpdateCompleteRequestFollowup
) {
  const res = await axios.patch<AdoptedAnimal>(
    hopeBackendUrl.followups.cancelFollowup(id),
    body
  );
  return res.data;
}
