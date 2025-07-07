interface CreateAdopterDto{
  firstName: string;
  lastName: string;
  documentNumber: string;
  phone: string;
  email: string;
  district: string;
  address: string;
  nationality: string;
}

interface UpdateAdopterDto extends Partial<CreateAdopterDto> {
  id?: string
}

interface FilterAdopterDto{

}