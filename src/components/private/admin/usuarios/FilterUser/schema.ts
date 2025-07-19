import { z } from "zod"

export const filterUserSchema = z.object({
  globalFilter: z.string().optional(),
  rol: z.enum(["admin", "volunteer", "veterinarian"]).optional(),
  location: z.string().optional(),
})

export type FilterUserValues = z.infer<typeof filterUserSchema>
