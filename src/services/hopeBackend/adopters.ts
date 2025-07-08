import { AxiosInstance } from 'axios';
import { hopeBackendUrl } from './url';

export async function findOneAdopter(axios: AxiosInstance, id: string) {
  const res = await axios.get<Adopter>(hopeBackendUrl.adopters.findOne(id));
  return res.data;
}

export async function findAllAdopters(
  axios: AxiosInstance,
  params?: FilterAdopterDto
) {
  const res = await axios.get<Adopter[]>(hopeBackendUrl.adopters.find(params));
  return res.data;
}

export async function createAdopters(
  axios: AxiosInstance,
  body?: CreateAdopterDto
) {
  const res = await axios.post<Adopter>(hopeBackendUrl.adopters.create, body);
  return res.data;
}

export async function updateAdopters(
  axios: AxiosInstance,
  id: string,
  body?: UpdateAdopterDto
) {
  const res = await axios.put<Adopter>(
    hopeBackendUrl.adopters.update(id),
    body
  );
  return res.data;
}

export async function deleteAdopters(axios: AxiosInstance, id: string) {
  const res = await axios.delete<Adopter>(hopeBackendUrl.adopters.delete(id));
  return res.data;
}
