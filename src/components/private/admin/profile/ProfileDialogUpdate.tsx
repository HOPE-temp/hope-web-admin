"use client"

import { useState, useRef } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "./ProfileAvatar"
import { CameraIcon } from "lucide-react"

export default function ProfileDialogUpdate() {
  const [user] = useState({
    nombre: "Nicole",
    apellido: "Guzmán",
    usuario: "Nico",
    telefono: "998745206",
    direccion: "Calle Perales 302",
    distrito: "Cercado",
    avatar: "",
  })

  const [form, setForm] = useState({ ...user })
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const previewUrl = URL.createObjectURL(file)
      setAvatarPreview(previewUrl)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Datos actualizados:", form)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Editar perfil</Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Actualizar perfil</DialogTitle>
        </DialogHeader>

        {/* Diseño en dos columnas */}
        <div className="flex flex-col md:flex-row gap-4 mt-4 overflow-y-auto max-h-[65vh] pr-2">
          {/* Formulario - lado izquierdo */}
          <form onSubmit={handleSubmit} className="w-full md:w-1/3 grid grid-cols-1 gap-4">
            {[
              { label: "Nombre de usuario", name: "usuario" },
              { label: "Nombre", name: "nombre" },
              { label: "Apellido", name: "apellido" },
              { label: "Teléfono", name: "telefono" },
              { label: "Dirección", name: "direccion" },
              { label: "Distrito", name: "distrito" },
            ].map(({ label, name }) => (
              <div key={name}>
                <label className="block text-sm font-medium mb-1">{label}</label>
                <input
                  name={name}
                  value={form[name as keyof typeof form]}
                  onChange={handleChange}
                  type="text"
                  className="border p-2 rounded w-full"
                />
              </div>
            ))}
          </form>

          {/* Avatar - lado derecho */}
          <div className="flex justify-center md:justify-start items-start">
            <div className="relative group min-w-fit">
              <Avatar className="h-32 w-32">
                <AvatarImage src={avatarPreview || user.avatar || "/images/usuario.png"} />
                <AvatarFallback>NG</AvatarFallback>
              </Avatar>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                title="Cambiar foto"
              >
                <CameraIcon className="w-4 h-4" />
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Botones debajo del contenido */}
        <div className="flex justify-end gap-2 mt-4">
          <DialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>
          <Button type="submit" onClick={handleSubmit}>Actualizar</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
