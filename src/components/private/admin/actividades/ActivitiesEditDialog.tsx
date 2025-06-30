"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Activity, UpdateActivityInput } from "@/hooks/useActivities";

const schema = z.object({
  title: z.string().min(3, "El título debe tener al menos 3 caracteres"),
  imageUrl: z.string().url("Debe ser una URL válida"),
  imagePublicId: z.string().min(1, "El ID de la imagen es requerido"),
  resourceUrl: z.string().url("Debe ser una URL válida"),
  scheduleStartAt: z.string().min(1, "La fecha de inicio es requerida"),
  scheduleEndAt: z.string().min(1, "La fecha de fin es requerida"),
  finished: z.boolean(),
  admin: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

type Props = {
  activity: Activity;
  updateActivity: (id: number, input: UpdateActivityInput) => Promise<any>;
};

export function ActivitiesEditDialog({ activity, updateActivity }: Props) {
  const [open, setOpen] = React.useState(false);
  const [formSuccess, setFormSuccess] = React.useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: activity.title ?? "",
      imageUrl: activity.imageUrl ?? "",
      imagePublicId: activity.imagePublicId ?? "",
      resourceUrl: activity.resourceUrl ?? "",
      scheduleStartAt: activity.scheduleStartAt ?? "",
      scheduleEndAt: activity.scheduleEndAt ?? "",
      finished: activity.finished ?? false,
      admin: activity.admin ?? false,
    },
  });

  // Reset form values when dialog opens
  React.useEffect(() => {
    if (open) {
      form.reset({
        title: activity.title ?? "",
        imageUrl: activity.imageUrl ?? "",
        imagePublicId: activity.imagePublicId ?? "",
        resourceUrl: activity.resourceUrl ?? "",
        scheduleStartAt: activity.scheduleStartAt ?? "",
        scheduleEndAt: activity.scheduleEndAt ?? "",
        finished: activity.finished ?? false,
        admin: activity.admin ?? false,
      });
      setFormSuccess(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, activity]);

  const onSubmit = async (data: FormValues) => {
    try {
      await updateActivity(activity.id, data);
      setFormSuccess("Actividad actualizada correctamente");
      setTimeout(() => {
        setOpen(false);
        setFormSuccess(null);
      }, 1200);
    } catch (err: any) {
      form.setError("root", { message: err.message || "Error desconocido" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Actividad</DialogTitle>
          <DialogDescription>
            Modifica los datos de la actividad y guarda los cambios.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL de Imagen</FormLabel>
                    <FormControl>
                      <Input {...field} type="url" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imagePublicId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID Público de Imagen</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="resourceUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL de Recurso</FormLabel>
                    <FormControl>
                      <Input {...field} type="url" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="scheduleStartAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha y hora de inicio</FormLabel>
                    <FormControl>
                      <Input {...field} type="datetime-local" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="scheduleEndAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha y hora de fin</FormLabel>
                    <FormControl>
                      <Input {...field} type="datetime-local" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="finished"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Finalizada</FormLabel>
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={e => field.onChange(e.target.checked)}
                        className="mr-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="admin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>¿Es de administración?</FormLabel>
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={e => field.onChange(e.target.checked)}
                        className="mr-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {form.formState.errors.root && (
              <div className="text-red-500 text-sm">{form.formState.errors.root.message}</div>
            )}
            {formSuccess && (
              <div className="text-green-600 text-sm">{formSuccess}</div>
            )}
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Guardando..." : "Guardar cambios"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
        </DialogContent>
    </Dialog>
  );
}