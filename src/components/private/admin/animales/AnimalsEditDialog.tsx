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
import { AnimalTableRow } from "@/hooks/useAnimals";

const schema = z.object({
    nickname: z.string().min(2, "El nombre es requerido"),
    breed: z.string().min(2, "La raza es requerida"),
    size: z.enum(["small", "medium", "large"], { message: "Tamaño inválido" }),
    sex: z.enum(["male", "female"], { message: "Sexo inválido" }),
    birthdate: z.string().min(1, "La fecha de nacimiento es requerida"),
    descriptionHistory: z.string().min(2, "La historia es requerida"),
    isSterilized: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

type Props = {
    animal: AnimalTableRow;
    updateAnimal: (id: number, input: FormValues) => Promise<any>;
};

export function AnimalsEditDialog({ animal, updateAnimal }: Props) {
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
        },
    });

    // Reset form values when dialog opens
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, animal]);

    const onSubmit = async (data: FormValues) => {
        try {
            await updateAnimal(animal.id, data);
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