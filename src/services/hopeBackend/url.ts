import { generateUrlWithParms } from "@/lib/generateUrlParma";
import { env } from "@/config/env";

export const hopeBackendUrl = { 
  adoptions: {
    'create': `/adoptions`,
    'find': (params?:FilterAdoptionDto ) => generateUrlWithParms<FilterAdoptionDto>(`/adoptions`,params),
    'findOne': (id: string) => `/adoptions/${id}`,
    'evaluate': (id: string) => `/adoptions/${id}/evaluate_request_adoption`,
    'linkAnimal': (id: string) => `/adoptions/${id}/linked_animal_with_adoption`,
    'completeAdoption': (id: string) => `/adoptions/${id}/complete_request_adoption`,
  }
}