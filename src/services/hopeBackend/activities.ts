import { AxiosInstance, isAxiosError } from 'axios';
import { hopeBackendUrl } from './url';
import toast from 'react-hot-toast';
export async function findOneActivity(axios: AxiosInstance, id: number) {
  const res = await axios.get<Activity>(hopeBackendUrl.activities.findOne(id));
  return res.data;
}

export async function findAllActivities(
  axios: AxiosInstance,
  params?: FilterActivityDto
) {
  try {
    const res = await axios.get<PaginationResponse<Activity>>(
      hopeBackendUrl.activities.find(params)
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

export async function createActivity(
  axios: AxiosInstance,
  body?: CreateActivityDto
) {
  const res = await axios.post<Activity>(
    hopeBackendUrl.activities.create,
    body
  );
  return res.data;
}

export async function updateActivity(
  axios: AxiosInstance,
  id: number,
  body: UpdateActivityDto
) {
  const res = await axios.patch<Activity>(
    hopeBackendUrl.activities.update(id),
    body
  );
  return res.data;
}

export async function uploadImageActivity(
  axios: AxiosInstance,
  id: number,
  file: File
): Promise<Activity> {
  const formData = new FormData();
  formData.append('file', file);

  const res = await axios.post<Activity>(
    hopeBackendUrl.activities.uploadImage(id),
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  if (res.status !== 200) {
    throw new Error('Error al subir imagen');
  }

  return res.data;
}

export async function finishActivity(axios: AxiosInstance, id: number) {
  const res = await axios.patch<Activity>(hopeBackendUrl.activities.finish(id));
  return res.data;
}

export async function deleteActivity(axios: AxiosInstance, id: number) {
  const res = await axios.delete<Adopter>(hopeBackendUrl.activities.delete(id));
  return res.data;
}
