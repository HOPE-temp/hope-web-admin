import { AxiosInstance } from 'axios';
import { hopeBackendUrl } from './url';

export async function findOneUser(axios: AxiosInstance, id: number) {
  const res = await axios.get<User>(hopeBackendUrl.users.findOne(id));
  return res.data;
}

export async function findAllUsers(
  axios: AxiosInstance,
  params?: FilterUserDto
) {
  const res = await axios.get<PaginationResponse<User>>(
    hopeBackendUrl.users.find(params)
  );
  return res.data;
}

export async function createUser(axios: AxiosInstance, body?: CreateUserDto) {
  const res = await axios.post<User>(hopeBackendUrl.users.create, body);
  return res.data;
}

export async function updatePublicUser(
  axios: AxiosInstance,
  id: number,
  body: UpdateUserDto
) {
  const res = await axios.put<User>(
    hopeBackendUrl.users.updatePublic(id),
    body
  );
  return res.data;
}

export async function updatePrivateUser(
  axios: AxiosInstance,
  id: number,
  body: UpdatePublicUserDto
) {
  const res = await axios.patch<User>(
    hopeBackendUrl.users.updatePrivate(id),
    body
  );
  return res.data;
}

// export async function uploadImageUser(
//   axios: AxiosInstance,
//   id: number,
//   file: File
// ): Promise<User> {
//   const formData = new FormData();
//   formData.append('file', file);

//   console.log(formData);
//   const res = await axios.post<User>(
//     hopeBackendUrl.users.uploadImage(id),
//     formData,
//     {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     }
//   );

//   if (res.status !== 200) {
//     throw new Error('Error al subir imagen');
//   }

//   return res.data;
// }

export async function deleteUser(axios: AxiosInstance, id: number) {
  const res = await axios.delete<Adopter>(hopeBackendUrl.users.delete(id));
  return res.data;
}
