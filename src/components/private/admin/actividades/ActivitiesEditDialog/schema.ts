import { z } from "zod";

export const schema = z
  .object({
    title: z
      .string()
      .min(1, "El título es obligatorio")
      .min(3, "El título debe tener al menos 3 caracteres")
      .max(100, "El título no puede exceder 100 caracteres"),
    resourceUrl: z
      .string()
      .refine(
        (value) => {
          if (!value || value === "") return true;
          try {
            new URL(value);
            return true;
          } catch {
            return false;
          }
        },
        { message: "Debe ser una URL válida" }
      )
      .optional()
      .or(z.literal("")),
    scheduleStartAt: z
      .string()
      .refine(
        (value) => {
          if (!value || value === "") return true;
          const date = new Date(value);
          const now = new Date();
          return date > now;
        },
        { message: "La fecha de inicio debe ser posterior a la fecha actual" }
      )
      .optional()
      .or(z.literal("")),
    scheduleEndAt: z
      .string()
      .refine(
        (value) => {
          if (!value || value === "") return true;
          const date = new Date(value);
          const now = new Date();
          return date > now;
        },
        { message: "La fecha de fin debe ser posterior a la fecha actual" }
      )
      .optional()
      .or(z.literal("")),
    admin: z.boolean(),
  })
  .refine(
    (data) => {
      if (data.scheduleStartAt && data.scheduleEndAt) {
        const startDate = new Date(data.scheduleStartAt);
        const endDate = new Date(data.scheduleEndAt);
        return startDate < endDate;
      }
      return true;
    },
    {
      message: "La fecha de fin debe ser posterior a la fecha de inicio",
      path: ["scheduleEndAt"],
    }
  );

export type FormValues = z.infer<typeof schema>;