import { z } from "zod"

export const userInfoSchema = z.object({
  lastName: z.string(),
  firstName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string().nullable(),
  documentNumber: z.string(),
  rol: z.string(),
  updatedAt: z.string().optional(),
  username: z.string(),
  avatar: z.string().nullable(),
  location: z.string().nullable(),
})

export const userSchema = z.object({
  id: z.number(),
  createdAt: z.string(),
  info: userInfoSchema,
})

export const filterUserSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
  search: z.string().optional(),
  rol: z.string().optional(),
})

export const paginationResponseSchema = z.object({
  items: z.array(userSchema),
  total: z.number(),
  limit: z.number(),
  offset: z.number(),
})

export type User = z.infer<typeof userSchema>
export type UserInfo = z.infer<typeof userInfoSchema>
export type FilterUserDto = z.infer<typeof filterUserSchema>
export type PaginationResponse<T> = {
  items: T[]
  total: number
  limit: number
  offset: number
}

export interface IUser {
  id: number
  createdAt: string
  info: IUserInfo
}

export interface IUserInfo {
  lastName: string
  firstName: string
  email: string
  phone: string
  address: string | null
  documentNumber: string
  rol: string
  updatedAt?: string
  username: string
  avatar: string | null
  location: string | null
}

export interface IFilterUserDto {
  limit?: number
  offset?: number
  search?: string
  rol?: string
}

export interface IPaginationResponse<T> {
  items: T[]
  total: number
  limit: number
  offset: number
}
