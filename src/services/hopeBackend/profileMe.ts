import { AxiosInstance } from 'axios';
import { hopeBackendUrl } from './url';

export async function findMe(axios: AxiosInstance) {
  const res = await axios.get<User>(hopeBackendUrl.profileMe.findMe);
  return res.data.info;
}

export async function updateMe(axios: AxiosInstance, body?: UpdateUserDto) {
  console.log('updateMe', body);
  const res = await axios.put<User>(hopeBackendUrl.profileMe.updateMe, body);
  return res.data;
}

export async function changePassword(
  axios: AxiosInstance,
  body: UpdateUserDto
) {
  const res = await axios.put<User>(
    hopeBackendUrl.profileMe.changePassword,
    body
  );
  return res.data;
}

export async function recoverPassword(
  axios: AxiosInstance,
  body: UpdatePrivateUserDto
) {
  const res = await axios.patch<User>(
    hopeBackendUrl.profileMe.recoverPassword,
    body
  );
  return res.data;
}

export async function resetPassword(
  axios: AxiosInstance,
  body: UpdatePrivateUserDto
) {
  const res = await axios.patch<User>(
    hopeBackendUrl.profileMe.resetPassword,
    body
  );
  return res.data;
}
