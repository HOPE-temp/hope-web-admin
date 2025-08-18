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

export async function updateUser(
  axios: AxiosInstance,
  id: number,
  body: UpdateUserDto
) {
  const res = await axios.patch<User>(hopeBackendUrl.users.update(id), body);
  return res.data;
}

export async function updatePrivateUser(
  axios: AxiosInstance,
  id: number,
  body: UpdatePrivateUserDto
) {
  const res = await axios.patch<User>(
    hopeBackendUrl.users.updatePrivate(id),
    body
  );
  return res.data;
}

export async function deleteUser(axios: AxiosInstance, id: number) {
  try {
    const res = await axios.delete<User>(hopeBackendUrl.users.delete(id));
    return res.data;
  } catch (error: any) {
    console.error('Error in deleteUser service:', error);

    let cleanError: {
      response: null | { data: any; status: any; statusText: any };
      message: string;
    } = {
      response: null,
      message: 'Error al eliminar usuario',
    };

    if (error.response) {
      cleanError.response = {
        data: error.response.data,
        status: error.response.status,
        statusText: error.response.statusText,
      };
    }

    throw cleanError;
  }
}
