import { z } from "zod";

export const finishActivitySchema = z.object({
  confirm: z.boolean().refine((val) => val === true, {
    message: "Debes confirmar para finalizar la actividad",
  }),
});

export type FinishActivityValues = z.infer<typeof finishActivitySchema>;
