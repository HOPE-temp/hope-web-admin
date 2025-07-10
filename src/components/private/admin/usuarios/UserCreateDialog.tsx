'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { CreateUserInput } from '@/hooks/useUser';

const schema = z.object({
  username: z.string().min(6, 'El usuario debe tener al menos 6 caracteres'),
  location: z.string().min(1, 'La ubicación no debe estar vacía'),
  firstName: z.string().min(6, 'El nombre debe tener al menos 6 caracteres'),
  lastName: z.string().min(6, 'El apellido debe tener al menos 6 caracteres'),
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'Debe tener una mayúscula')
    .regex(/[a-z]/, 'Debe tener una minúscula')
    .regex(/[0-9]/, 'Debe tener un número'),
  email: z.string().email('El email no es válido'),
  phone: z.string().regex(/^\d{9}$/, 'El teléfono debe tener 9 dígitos'),
  address: z.string().min(6, 'La dirección debe tener al menos 6 caracteres'),
  documentNumber: z
    .string()
    .regex(
      /^(\d{8}|[A-Za-z0-9]{9,12})$/,
      'El DNI debe tener 8 dígitos o CE entre 9 y 12 caracteres alfanuméricos'
    ),
  rol: z.enum(['admin', 'volunteer', 'veterinarian'], {
    message: 'Rol inválido',
  }),
});

type FormValues = z.infer<typeof schema>;

type Props = {
  createUser: (input: CreateUserInput) => Promise<any>;
};

export function UserCreateDialog({ createUser }: Props) {
  const [open, setOpen] = React.useState(false);
  const [formSuccess, setFormSuccess] = React.useState<string | null>(null);
  const [showPassword, setShowPassword] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      location: '',
      firstName: '',
      lastName: '',
      password: '',
      email: '',
      phone: '',
      address: '',
      documentNumber: '',
      rol: undefined,
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await createUser(data);
      setFormSuccess('Usuario registrado correctamente');
      form.reset();
      setTimeout(() => {
        setOpen(false);
        setFormSuccess(null);
      }, 1200);
    } catch (err: any) {
      form.setError('root', { message: err.message || 'Error desconocido' });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Registrar Usuario
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Registrar Usuario</DialogTitle>
          <DialogDescription>
            Completa los campos para crear un nuevo usuario.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* DNI */}
              <FormField
                control={form.control}
                name="documentNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>DNI</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        inputMode="numeric"
                        pattern="\d*"
                        maxLength={12}
                        onInput={e => {
                          e.currentTarget.value = e.currentTarget.value.replace(
                            /[^0-9A-Za-z]/g,
                            ''
                          );
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
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usuario</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ubicación</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Teléfono */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        inputMode="numeric"
                        pattern="\d*"
                        maxLength={9}
                        onInput={e => {
                          e.currentTarget.value = e.currentTarget.value.replace(
                            /[^0-9]/g,
                            ''
                          );
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
                name="rol"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rol</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="w-full border rounded-md px-3 py-2"
                      >
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPassword ? 'text' : 'password'}
                        />
                        <button
                          type="button"
                          tabIndex={-1}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                          onClick={() => setShowPassword(v => !v)}
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {form.formState.errors.root && (
              <div className="text-red-500 text-sm">
                {form.formState.errors.root.message}
              </div>
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
                {form.formState.isSubmitting ? 'Registrando...' : 'Registrar'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
