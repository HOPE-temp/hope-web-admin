"use client"

import { Card, CardContent } from "@/components/private/admin/profile/ProfileCard"

interface ProfileData {
  nombre: string
  apellido: string
  usuario: string
  telefono: string
  direccion: string
  distrito: string
  rol: string
}

const profile: ProfileData = {
  nombre: "Nicole",
  apellido: "Guzmán",
  usuario: "Nico",
  telefono: "998745206",
  direccion: "Calle Perales 302",
  distrito: "Cercado",
  rol: "Voluntario",
}

export default function ProfileInfo() {
  return (
    <Card className="w-full max-w-md mt-6">
      <CardContent className="space-y-4 p-6">
        {Object.entries(profile).map(([label, value]) => (
          <div key={label}>
            <p className="text-sm font-semibold capitalize">{label}</p>
            <p className="text-base">{value}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

