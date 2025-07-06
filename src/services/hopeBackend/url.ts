import { generateUrlWithParms } from "@/lib/generateUrlParma";
import { env } from "@/config/env";

export const hopeBackendUrl = { 
  adoptions: {
    'create': `/adoptions`,
    'find': (params?:FilterAdoptionDto ) => generateUrlWithParms<FilterAdoptionDto>(`/adoptions`,params),
    'findOne': (id: string) => `/adoptions/${id}`
  }
}