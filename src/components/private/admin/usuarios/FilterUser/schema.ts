import { z } from "zod";

export const filterUserSchema = z.object({
  search: z
    .string()
    .optional()
    .transform(val => val === "" ? undefined : val),
  rol: z
    .enum(["admin", "volunteer", "veterinarian"])
    .optional(),
});

export type FilterUserValues = z.infer<typeof filterUserSchema>;
