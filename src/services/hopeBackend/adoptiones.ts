import { hopeBackendUrl } from "./url";

export async function findOneAdoption(axios: Axios.AxiosInstance, id:string ){
  const res = await axios.get<Adoption>(hopeBackendUrl.adoptions.findOne(id))
  return res.data
}

export async function findAllAdoptions(axios: Axios.AxiosInstance, params?:FilterAdoptionDto){
  const res = await axios.get<Adoption[]>(hopeBackendUrl.adoptions.find(params))
  return res.data
}
