"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import type { CreateAnimalInput } from "@/hooks/useAnimals"

const today = new Date().toISOString().split("T")[0]

const schema = z.object({
  nickname: z.string().min(3, "El nombre debe tener al menos 3 caracteres").nonempty("El nombre es requerido"),
  status: z.enum(["in_adoption", "in_observation"], { message: "Estado inválido" }),
  type: z.enum(["dog", "cat"], { message: "Tipo inválido" }),
  breed: z.string().min(3, "La raza debe tener al menos 3 caracteres").nonempty("La raza es requerida"),
  size: z.enum(["small", "medium", "large", "giant"], { message: "Tamaño inválido" }),
  sex: z.enum(["male", "female"], { message: "Sexo inválido" }),
  birthdate: z
    .string()
    .refine((val) => !!val, { message: "La fecha de nacimiento es requerida" })
    .refine((val) => !isNaN(Date.parse(val)), { message: "Fecha inválida" })
    .refine((val) => val <= today, { message: "La fecha no puede ser mayor a hoy" }),
  descriptionHistory: z
    .string()
    .min(6, "La historia debe tener al menos 6 caracteres")
    .nonempty("La historia es requerida"),
  isSterilized: z.boolean(),
})

type FormValues = z.infer<typeof schema>

type Props = {
  createAnimal: (input: CreateAnimalInput) => Promise<any>
}

export function AnimalsCreateDialog({ createAnimal }: Props) {
  const [open, setOpen] = React.useState(false)
  const [formSuccess, setFormSuccess] = React.useState<string | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      nickname: "",
      status: "in_observation",
      type: "dog",
      breed: "",
      size: "medium",
      sex: "female",
      birthdate: "",
      descriptionHistory: "",
      isSterilized: false,
    },
  })

  const onSubmit = async (data: FormValues) => {
    try {
      await createAnimal(data)
      setFormSuccess("Animal registrado correctamente")
      form.reset()
      setTimeout(() => {
        setOpen(false)
        setFormSuccess(null)
      }, 1200)
    } catch (err: any) {
      form.setError("root", { message: err.message || "Error desconocido" })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Registrar Animal
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registrar Animal</DialogTitle>
          <DialogDescription>Completa los campos para crear un nuevo animal.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nickname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <FormControl>
                      <select {...field} className="w-full border rounded-md px-3 py-2">
                        <option value="in_observation">En observación</option>
                        <option value="in_adoption">En adopción</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo</FormLabel>
                    <FormControl>
                      <select {...field} className="w-full border rounded-md px-3 py-2">
                        <option value="dog">Perro</option>
                        <option value="cat">Gato</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="breed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Raza</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tamaño</FormLabel>
                    <FormControl>
                      <select {...field} className="w-full border rounded-md px-3 py-2">
                        <option value="small">Pequeño</option>
                        <option value="medium">Mediano</option>
                        <option value="large">Grande</option>
                        <option value="giant">Gigante</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sex"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sexo</FormLabel>
                    <FormControl>
                      <select {...field} className="w-full border rounded-md px-3 py-2">
                        <option value="female">Hembra</option>
                        <option value="male">Macho</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthdate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha de nacimiento</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" max={today} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="descriptionHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Historia</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isSterilized"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Esterilizado</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                          className="mr-2"
                        />
                        <span>{field.value ? "Sí" : "No"}</span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {form.formState.errors.root && (
              <div className="text-red-500 text-sm">{form.formState.errors.root.message}</div>
            )}
            {formSuccess && <div className="text-green-600 text-sm">{formSuccess}</div>}
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Registrando..." : "Registrar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}