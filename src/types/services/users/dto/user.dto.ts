interface CreatePublicUserDto {
  readonly username: string;
  // readonly avatar: string;
  readonly location: string;
}

interface CreatePrivateUserDto {
  readonly firstName: string;
  readonly lastName: string;
  readonly password: string;
  readonly email: string;
  readonly phone: string;
  readonly address: string;
  readonly documentNumber: string;
  readonly rol: RoleUser;
}

interface UpdatePrivateUserDto {
  readonly firstName: string;
  readonly lastName: string;  
  readonly email: string;
  readonly phone: string;
  readonly address: string;  
  readonly rol: RoleUser;
}

interface CreateUserDto{
  readonly username: string;
  readonly firstName: string;
  readonly lastName: string;  
  readonly password: string;
  readonly phone: string;
  readonly email: string;
  readonly documentNumber: string;
  readonly rol: RoleUser;
  readonly location: string;
  readonly address: string;
}

interface UpdateUserDto
  extends Partial<
    Omit<CreateUserDto, 'password' | 'email' | 'documentNumber'>
  > {}

interface UpdatePublicUserDto extends Partial<CreatePublicUserDto> {}

interface UpdatePasswordUserDto
  extends Pick<CreatePrivateUserDto, 'password'> {}

interface UpdateRecoverPasswordUserDto
  extends Pick<CreatePrivateUserDto, 'email'> {}

interface UpdateResetPasswordUserDto
  extends Pick<CreatePrivateUserDto, 'password'> {
  token: string;
}

interface FilterUserDto extends PaginationDto {
  username?: string;
  email?: string;
  rol?: string;  
}
