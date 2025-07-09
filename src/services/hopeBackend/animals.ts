import { AxiosInstance } from 'axios';
import { hopeBackendUrl } from './url';
export async function findOneAnimal(axios: AxiosInstance, id: number) {
  const res = await axios.get<Animal>(hopeBackendUrl.animals.findOne(id));
  return res.data;
}

export async function findAllAnimals(
  axios: AxiosInstance,
  params?: FilterAnimalDto
) {
  const res = await axios.get<{
    items: Animal[];
    total: number;
    limit: number;
    offset: number;
  }>(hopeBackendUrl.animals.find(params));
  return res.data;
}

export async function createAnimal(
  axios: AxiosInstance,
  body?: CreateAnimalDto
) {
  const res = await axios.post<Animal>(hopeBackendUrl.animals.create, body);
  return res.data;
}

export async function updateAnimal(
  axios: AxiosInstance,
  id: number,
  body: UpdateAnimalDto
) {
  const res = await axios.put<Animal>(hopeBackendUrl.animals.update(id), body);
  return res.data;
}

export async function updateStatusAnimal(
  axios: AxiosInstance,
  id: number,
  body: UpdateStatusAnimalDto
) {
  const res = await axios.patch<Animal>(
    hopeBackendUrl.animals.updateStatus(id),
    body
  );
  return res.data;
}

export async function uploadImageAnimal(
  axios: AxiosInstance,
  id: number,
  file: File
): Promise<Animal> {
  const formData = new FormData();
  formData.append('file', file);

  console.log(formData);
  const res = await axios.post<Animal>(
    hopeBackendUrl.animals.uploadImage(id),
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

export async function deleteAnimal(axios: AxiosInstance, id: number) {
  const res = await axios.delete<Adopter>(hopeBackendUrl.animals.delete(id));
  return res.data;
}
