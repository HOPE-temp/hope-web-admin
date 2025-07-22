import { z } from "zod";

export const filterActivitySchema = z.object({
  search: z
    .string()
    .optional()
    .transform(val => val === "" ? undefined : val),
  finished: z
    .string()
    .optional()
    .transform(val => {
      if (val === "true") return true;
      if (val === "false") return false;
      return undefined;
    }),
  admin: z
    .string()
    .optional()
    .transform(val => {
      if (val === "true") return true;
      if (val === "false") return false;
      return undefined;
    }),
});

export type FilterActivityValues = z.input<typeof filterActivitySchema>;
