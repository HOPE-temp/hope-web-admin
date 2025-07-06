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
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { AnimalTableRow, EditAnimalInput, useAnimals } from "@/hooks/useAnimals";

const today = new Date().toISOString().split("T")[0]
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
const schema = z.object({
    nickname: z.string().min(2, "El nombre es requerido"),
    breed: z.string().min(2, "La raza es requerida"),
    size: z.enum(["small", "medium", "large"], { message: "Tamaño inválido" }),
    sex: z.enum(["male", "female"], { message: "Sexo inválido" }),
    birthdate: z
        .string()
        .refine((val) => !!val, { message: "La fecha de nacimiento es requerida" })
        .refine((val) => !isNaN(Date.parse(val)), { message: "Fecha inválida" })
        .refine((val) => val <= today, { message: "La fecha no puede ser mayor a hoy" }),
    descriptionHistory: z.string().min(2, "La historia es requerida"),
    isSterilized: z.boolean(),
    image: imageSchema
});

type FormValues = z.infer<typeof schema>;

type Props = {
    animal: AnimalTableRow;
    updateAnimal: (id: number, input: EditAnimalInput) => Promise<any>;
    uploadImage: (id: number, file: File) => Promise<any>;
};

export function AnimalsEditDialog({ animal, updateAnimal, uploadImage }: Props) {
    const [open, setOpen] = React.useState(false);
    const [formSuccess, setFormSuccess] = React.useState<string | null>(null);

    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            nickname: animal.nickname ?? "",
            breed: animal.breed ?? "",
            size: (["small", "medium", "large"].includes(animal.size as string) ? animal.size : "medium") as "small" | "medium" | "large",
            sex: (["male", "female"].includes(animal.sex as string) ? animal.sex : "female") as "male" | "female",
            birthdate: animal.birthdate ?? "",
            descriptionHistory: animal.descriptionHistory ?? "",
            isSterilized: animal.isSterilized ?? false,
            image: undefined
        },
    });

    
    React.useEffect(() => {
        if (open) {
            form.reset({
                nickname: animal.nickname ?? "",
                breed: animal.breed ?? "",
                size: (["small", "medium", "large"].includes(animal.size as string) ? animal.size : "medium") as "small" | "medium" | "large",
            sex: (["male", "female"].includes(animal.sex as string) ? animal.sex : "female") as "male" | "female",
                birthdate: animal.birthdate ?? "",
                descriptionHistory: animal.descriptionHistory ?? "",
                isSterilized: animal.isSterilized ?? false,
            });
            setFormSuccess(null);
        }
        
    }, [open, animal]);

    const onSubmit = async ({image, ...data}: FormValues ) => {
        try {
            const { id }= await updateAnimal(animal.id, data);
            if(image){
                const file = image?.item(0)
                if(file){
                  await uploadImage(id, file)
                }
              }
            setFormSuccess("Animal actualizado correctamente");
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
                    <DialogTitle>Editar Animal</DialogTitle>
                    <DialogDescription>
                        Modifica los datos del animal y guarda los cambios.
                    </DialogDescription>
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
                                            <Input {...field} type="date" />
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
                                            <Textarea {...field} />
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
                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Imagen</FormLabel>
                                    <FormControl>
                                      <div className="flex items-center">
                                        <input
                                              type="file"
                                              accept="image/*"
                                              className="mr-2"
                                              onChange={(e) => {
                                                const fileList = e.target.files;
                                                if (fileList && fileList.length > 0) {
                                                  field.onChange(fileList); // pasamos el FileList al estado del form
                                                }
                                              }}
                                            />
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
        </Dialog >
    );
}