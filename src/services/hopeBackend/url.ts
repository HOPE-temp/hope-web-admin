import { generateUrlWithParms } from '@/lib/generateUrlParma';
import { env } from '@/config/env';

export const hopeBackendUrl = {
  adoptions: {
    create: `/adoptions`,
    find: (params?: FilterAdoptionDto) =>
      generateUrlWithParms<FilterAdoptionDto>(`/adoptions`, params),
    findOne: (id: string) => `/adoptions/${id}`,
    evaluate: (id: string) => `/adoptions/${id}/evaluate_request_adoption`,
    linkAnimal: (id: string) => `/adoptions/${id}/linked_animal_with_adoption`,
    completeAdoption: (id: string) =>
      `/adoptions/${id}/complete_request_adoption`,
  },
  adopters: {
    create: `/adopters`,
    find: (params?: FilterAdopterDto) =>
      generateUrlWithParms<FilterAdopterDto>(`/adopters`, params),
    findOne: (id: string) => `/adopters/${id}`,
    update: (id: string) => `/adopters/${id}`,
    delete: (id: string) => `/adopters/${id}`,
  },
  animals: {
    create: `/animals`,
    find: (params?: FilterAnimalDto) =>
      generateUrlWithParms<FilterAnimalDto>(`/animals`, params),
    findOne: (id: number) => `/animals/${id}`,
    update: (id: number) => `/animals/${id}`,
    updateStatus: (id: number) => `/animals/${id}/status`,
    uploadImage: (id: number) => `/animals/${id}/upload_image`,
    delete: (id: number) => `/animals/${id}`,
  },
};
