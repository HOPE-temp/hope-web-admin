"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Heart,
  ArrowLeft,
  MapPin,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/home/header"
import Footer from "@/components/home/footer"
import { notFound } from "next/navigation"
import { usePetById } from "@/hooks/usePetById"

interface PageProps {
  params: {
    id: string
  }
}

export default function PetDetailPage({ params }: PageProps) {
  const { pet, loading, error } = usePetById(params.id)

  if (loading) return <div className="p-8 text-center">Cargando mascota...</div>
  if (error || !pet) {
    notFound()
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/mascotas" className="hover:text-teal-600 flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Volver a Mascotas
          </Link>
          <span>/</span>
          <span>{pet.nickname}</span>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Columna Principal - Imágenes y Descripción */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-0 flex justify-center">
                <div className="relative w-full max-w-xl aspect-[4/3] bg-gray-100 rounded-t-lg overflow-hidden flex items-center justify-center">
                  <Image
                    src={pet.images?.[0] || "/placeholder.svg"}
                    alt={pet.nickname}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-t-lg"
                    sizes="(max-width: 1024px) 100vw, 600px"
                  />                  
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Conoce a {pet.nickname}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">{pet.descriptionHistory}</p>
              </CardContent>
            </Card>
          </div>
          {/* Sidebar - Información y Contacto */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-3xl">{pet.nickname}</CardTitle>
                    <p className="text-lg text-gray-600">{pet.breed}</p>
                  </div>
                  <Badge variant="outline" className="capitalize text-lg px-3 py-1">
                    {pet.type === "dog" ? "Perro" : pet.type === "cat" ? "Gato" : pet.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Nacimiento</p>
                    <p className="text-lg">{pet.birthdate ? new Date(pet.birthdate).toLocaleDateString("es-ES") : "Desconocido"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Esterilizado</p>
                    <p className="text-lg">{pet.isSterilized ? "Sí" : "No"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Sexo</p>
                    <p className="text-lg capitalize">{pet.sex === "male" ? "Macho" : "Hembra"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Tamaño</p>
                    <p className="text-lg capitalize">
                      {pet.size === "small"
                        ? "Pequeño"
                        : pet.size === "medium"
                        ? "Mediano"
                        : pet.size === "large"
                        ? "Grande"
                        : pet.size}
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Arequipa</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
