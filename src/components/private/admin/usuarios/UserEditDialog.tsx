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
import { UpdateUserInput, UserTableRow } from "@/hooks/useUser";

const schema = z.object({
  firstName: z.string().min(6, "El nombre debe tener al menos 6 caracteres"),
  lastName: z.string().min(6, "El apellido debe tener al menos 6 caracteres"),
  email: z.string().email("El email no es válido"),
  phone: z.string().regex(/^\d{9}$/, "El teléfono debe tener 9 dígitos"),
  address: z.string().min(6, "La dirección debe tener al menos 6 caracteres"),
  rol: z.enum(["admin", "volunteer", "veterinarian"], { message: "Rol inválido" }),
});

type FormValues = z.infer<typeof schema>;

type Props = {
  user: UserTableRow;
  updateUser: (id: number, input: UpdateUserInput) => Promise<any>;
};

export function UserEditDialog({ user, updateUser }: Props) {
  const [open, setOpen] = React.useState(false);
  const [formSuccess, setFormSuccess] = React.useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
      address: user.address ?? "",
      rol: undefined,
    },
  });

  // Reset form values when dialog opens
  React.useEffect(() => {
    if (open) {
      form.reset({
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
        address: user.address ?? "",
        rol: undefined,
      });
      setFormSuccess(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, user]);

  const onSubmit = async (data: FormValues) => {
    try {
      await updateUser(user.id, data);
      setFormSuccess("Usuario actualizado correctamente");
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
          <DialogTitle>Editar Usuario</DialogTitle>
          <DialogDescription>
            Modifica los datos permitidos del usuario y guarda los cambios.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombres</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellidos</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="tel"
                        pattern="\d*"
                        inputMode="numeric"
                        maxLength={9}
                        onInput={e => {
                          // Solo permite números
                          e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dirección</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rol"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rol</FormLabel>
                    <FormControl>
                      <select {...field} className="w-full border rounded-md px-3 py-2">
                        <option value="">Selecciona un rol</option>
                        <option value="admin">Administrador</option>
                        <option value="volunteer">Voluntario</option>
                        <option value="veterinarian">Veterinario</option>
                      </select>
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
