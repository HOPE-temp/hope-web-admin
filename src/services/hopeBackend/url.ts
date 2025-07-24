import { generateUrlWithParms } from '@/lib/generateUrlParma';

export const hopeBackendUrl = {
  activities: {
    create: `/activities`,
    find: (params?: FilterActivityDto) =>
      generateUrlWithParms<FilterActivityDto>(`/activities`, params),
    findOne: (id: number) => `/activities/${id}`,
    update: (id: number) => `/activities/${id}`,
    finish: (id: number) => `/activities/${id}/finish`,
    uploadImage: (id: number) => `/activities/${id}/upload_image`,
    delete: (id: number) => `/activities/${id}`,
  },
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
  followups: {
    create: `/followups`,
    find: (params?: FilterAdoptionDto) =>
      generateUrlWithParms<FilterAdoptionDto>(`/followups`, params),
    findOne: (id: string) => `/followups/${id}`,
    rescheduleFollowup: (id: string) => `/followups/${id}/reschedule`,
    checkupSchedule: (id: string) => `/followups/${id}/checkupSchedule`,
    completeFollowup: (id: string) => `/followups/${id}/complete`,
    cancelFollowup: (id: string) => `/followups/${id}/cancel`,
  },
  adopters: {
    create: `/adopters`,
    find: (params?: FilterAdopterDto) =>
      generateUrlWithParms<FilterAdopterDto>(`/adopters`, params),
    findOne: (id: number) => `/adopters/${id}`,
    update: (id: number) => `/adopters/${id}`,
    delete: (id: number) => `/adopters/${id}`,
  },
  evaluations: {
    create: (adopterId: number) => `/adopters/${adopterId}}/evaluations`,
    findByAdopter: (adopterId: number) => `/adopters/${adopterId}}/evaluations`,
    findOne: (id: string) => `/evaluations/${id}}`,
  },
  animals: {
    create: `/animals`,
    find: (params?: FilterAnimalDto) =>
      generateUrlWithParms<FilterAnimalDto>(`/animals`, params),
    findOne: (id: number) => `/animals/${id}`,
    findManyIds: `/animals/getManyIds`,
    update: (id: number) => `/animals/${id}`,
    updateStatus: (id: number) => `/animals/${id}/status`,
    uploadImage: (id: number) => `/animals/${id}/upload_image`,
    delete: (id: number) => `/animals/${id}`,
  },

  medical_checkups: {
    create: `/medical-checkups`,
    find: (params?: FilterAdopterDto) =>
      generateUrlWithParms<FilterAdopterDto>(`/medical-checkups`, params),
    findOne: (id: number) => `/medical-checkups/${id}`,
    update: (id: number) => `/medical-checkups/${id}`,
    start_checkup: (id: number) => `/medical-checkups/${id}/start_checkup`,
    end_checkup: (id: number) => `/medical-checkups/${id}/end_checkup`,
    delete: (id: number) => `/medical-checkups/${id}`,
  },
  users: {
    create: `/users`,
    find: (params?: FilterUserDto) =>
      generateUrlWithParms<FilterUserDto>(`/users`, params),
    findOne: (id: number) => `/users/${id}`,
    updatePublic: (id: number) => `/users/${id}`,
    updatePrivate: (id: number) => `/users/${id}/private`,
    // uploadImage: (id: number) => `/users/${id}/upload_image`,
    delete: (id: number) => `/users/${id}`,
  },

  reports: {
    counts: `/reports/counts`,
  },
};
