"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Pencil, Upload, Link, Calendar, Save } from "lucide-react"
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
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"
import type { Activity } from "./ActivitiesTable"

const imageSchema = z
  .custom<FileList>((v) => v instanceof FileList && v.length > 0, {
    message: "Se requiere una imagen",
  })
  .refine((fileList) => fileList[0].type.startsWith("image/"), {
    message: "El archivo debe ser una imagen",
  })
  .refine((fileList) => fileList[0].size <= 5 * 1024 * 1024, {
    message: "La imagen no debe superar los 5MB",
  })

const schema = z
  .object({
    title: z
      .string()
      .min(3, "El título debe tener al menos 3 caracteres")
      .max(100, "El título no puede exceder 100 caracteres"),
    imageUrl: imageSchema,
    imagePublicId: z.string().optional().or(z.literal("")),
    resourceUrl: z.string().url("Debe ser una URL válida").optional().or(z.literal("")),
    scheduleStartAt: z.string().optional().or(z.literal("")),
    scheduleEndAt: z.string().optional().or(z.literal("")),
    admin: z.boolean(),
  })
  .refine(
    (data) => {
      if (data.scheduleStartAt && data.scheduleEndAt) {
        return new Date(data.scheduleStartAt) < new Date(data.scheduleEndAt)
      }
      return true
    },
    {
      message: "La fecha de fin debe ser posterior a la fecha de inicio",
      path: ["scheduleEndAt"],
    },
  )

type FormValues = z.infer<typeof schema>

export interface UpdateActivityInput {
  title?: string
  imageUrl?: string | null
  imagePublicId?: string | null
  resourceUrl?: string | null
  scheduleStartAt?: string | null
  scheduleEndAt?: string | null
  admin?: boolean
}

type Props = {
  activity: Activity
  updateActivity: (id: number, input: UpdateActivityInput) => Promise<any>
  updaloadImageActivity: (id: number, file: File) => Promise<any>
}

export function ActivitiesEditDialog({ activity, updateActivity, updaloadImageActivity}: Props) {

  const [open, setOpen] = React.useState(false)
  const [formSuccess, setFormSuccess] = React.useState<string | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: activity.title || "",
      imageUrl: undefined ,
      imagePublicId: activity.imagePublicId || "",
      resourceUrl: activity.resourceUrl || "",
      scheduleStartAt: activity.scheduleStartAt ? new Date(activity.scheduleStartAt).toISOString().slice(0, 16) : "",
      scheduleEndAt: activity.scheduleEndAt ? new Date(activity.scheduleEndAt).toISOString().slice(0, 16) : "",
      admin: activity.admin,
    },
  })

  React.useEffect(() => {
    if (open) {
      form.reset({
        title: activity.title || "",
        imageUrl: undefined,
        imagePublicId: activity.imagePublicId || "",
        resourceUrl: activity.resourceUrl || "",
        scheduleStartAt: activity.scheduleStartAt ? new Date(activity.scheduleStartAt).toISOString().slice(0, 16) : "",
        scheduleEndAt: activity.scheduleEndAt ? new Date(activity.scheduleEndAt).toISOString().slice(0, 16) : "",
        admin: activity.admin,
      })
      setFormSuccess(null)
    }
  }, [open, activity, form])

  const onSubmit = async (data: FormValues) => {
    try {
      const payload = {
        title: data.title,
        resourceUrl: data.resourceUrl || "",
        scheduleStartAt: data.scheduleStartAt || "",
        scheduleEndAt: data.scheduleEndAt || "",
        admin: data.admin,
      }

      const {id} = await updateActivity(activity.id, payload)
      if(data?.imageUrl){
        const file = data?.imageUrl?.item(0)
        if(file){
          await updaloadImageActivity(id, file)
        }
      }
      setFormSuccess("Actividad actualizada correctamente")
      setTimeout(() => {
        setOpen(false)
        setFormSuccess(null)
      }, 1500)
    } catch (err: any) {
      form.setError("root", { message: err.message || "Error desconocido" })
    }
  }

  const handleDialogChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      setFormSuccess(null)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Save className="w-5 h-5" />
            Editar Actividad
          </DialogTitle>
          <DialogDescription>Modifica la información de la actividad "{activity.title}"</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Estado Actual</h3>
                  <div className="flex gap-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        activity.admin ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {activity.admin ? "Solo Admin" : "Regular"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Información Básica</h3>

                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Nombre de la actividad" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="admin"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                            className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Actividad de administración</FormLabel>
                          <FormDescription>Solo administradores pueden finalizarla</FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    <h3 className="text-lg font-medium">Recursos Multimedia</h3>
                  </div>

                 

                  <FormField
                    control={form.control}
                    name="resourceUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL de Recurso</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input {...field} type="url" placeholder="https://..." className="pl-10" />
                          </div>
                        </FormControl>
                        <FormDescription>Enlace a redes sociales, páginas web, seguimientos, etc.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    <h3 className="text-lg font-medium">Image File</h3>
                  </div>


                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL de Recurso</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const fileList = e.target.files;
                                if (fileList && fileList.length > 0) {
                                  field.onChange(fileList); // pasamos el FileList al estado del form
                                }
                              }}
                            />
                          </div>
                        </FormControl>
                        <FormDescription>Enlace a redes sociales, páginas web, seguimientos, etc.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <h3 className="text-lg font-medium">Programación</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="scheduleStartAt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fecha y Hora de Inicio</FormLabel>
                          <FormControl>
                            <Input {...field} type="datetime-local" />
                          </FormControl>
                          <FormDescription>Cuándo debe comenzar la actividad</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="scheduleEndAt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fecha y Hora de Fin</FormLabel>
                          <FormControl>
                            <Input {...field} type="datetime-local" />
                          </FormControl>
                          <FormDescription>Cuándo debe finalizar la actividad</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mensajes de error y éxito */}
            {form.formState.errors.root && (
              <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                {form.formState.errors.root.message}
              </div>
            )}

            {formSuccess && <div className="bg-green-50 text-green-700 text-sm p-3 rounded-md">{formSuccess}</div>}

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
