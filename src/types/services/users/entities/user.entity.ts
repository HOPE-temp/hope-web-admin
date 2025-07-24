interface User {
  id: number;
  createdAt: string;
  info: UserInfo;
  publicInfo: {
    username: string;
  };
}

interface PrivateUser {
  id: number;
  user: User;
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  documentNumber: string;
  rol: RoleUser;
  updatedAt?: Date;
}
interface PublicUser {
  id: number;
  user: User;
  //  username: string;
  avatar: string;
  location: string;
  updatedAt?: Date;
}

interface UserInfo {
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  address: string | null;
  documentNumber: string;
  rol: string;
  updatedAt?: string;
  username: string;
  avatar: string | null;
  location: string | null;
}
