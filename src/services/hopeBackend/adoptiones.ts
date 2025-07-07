import { hopeBackendUrl } from "./url";

export async function findOneAdoption(axios: Axios.AxiosInstance, id:string ){
  const res = await axios.get<Adoption>(hopeBackendUrl.adoptions.findOne(id))
  return res.data
}

export async function findAllAdoptions(axios: Axios.AxiosInstance, params?:FilterAdoptionDto){
  const res = await axios.get<Adoption[]>(hopeBackendUrl.adoptions.find(params))
  return res.data
}

export async function createAdoption(axios: Axios.AxiosInstance, body?:CreateAdoptionDto){
  const res = await axios.post<Adoption[]>(hopeBackendUrl.adoptions.create, body)
  return res.data
}

export async function evaluationAdoption(
  axios: Axios.AxiosInstance,
  id:string,
  body?:UpdateAdoptionEvaluateDto
){
  const res = await axios.patch<Adoption[]>(hopeBackendUrl.adoptions.evaluate(id), body)
  return res.data
}

export async function linkAnimalAdoption(
  axios: Axios.AxiosInstance,
  id:string,
  body?:UpdateLinkAnimalWithAdoption
){
  const res = await axios.patch<Adoption[]>(hopeBackendUrl.adoptions.linkAnimal(id), body)
  return res.data
}

export async function completeAdoption(
  axios: Axios.AxiosInstance,
  id:string,
  body?:UpdateCompleteRequestAdoption
){
  const res = await axios.patch<Adoption[]>(hopeBackendUrl.adoptions.completeAdoption(id), body)
  return res.data
}
