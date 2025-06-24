"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Heart, Search, MapPin, Calendar, PawPrint } from "lucide-react"
import { usePets } from "@/hooks/useMascotas"
import Image from "next/image"
import Header from "@/components/home/header"
import Footer from "@/components/home/footer"
import Link from "next/link"



export default function MascotasPage() {
  const { pets, loading, error } = usePets()
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("todos")
  const [sizeFilter, setSizeFilter] = useState("todos")
  const [genderFilter, setGenderFilter] = useState("todos")  

  // Mapear datos del backend a los filtros y UI
  const filteredPets = pets.filter((pet) => {
    const matchesSearch =
      pet.nickname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "todos" || pet.type === typeFilter
    const matchesSize = sizeFilter === "todos" || pet.size === sizeFilter
    const matchesGender =
      genderFilter === "todos" ||
      (genderFilter === "macho" && pet.sex === "male") ||
      (genderFilter === "hembra" && pet.sex === "female")

    return matchesSearch && matchesType && matchesSize && matchesGender
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <Header />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-teal-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Encuentra tu Compañero Perfecto</h1>
            <p className="text-xl text-teal-100 mb-8">Todos nuestros animales están esperando un hogar lleno de amor</p>
            <div className="flex justify-center space-x-4">
              <div className="bg-white/20 px-4 py-2 rounded-full">
                <span className="font-semibold">{pets.length}</span> mascotas disponibles
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-6 gap-4 items-end">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por nombre o raza..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="dog">Perros</SelectItem>
                  <SelectItem value="cat">Gatos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tamaño</label>
              <Select value={sizeFilter} onValueChange={setSizeFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="small">Pequeño</SelectItem>
                  <SelectItem value="medium">Mediano</SelectItem>
                  <SelectItem value="large">Grande</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Género</label>
              <Select value={genderFilter} onValueChange={setGenderFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="macho">Macho</SelectItem>
                  <SelectItem value="hembra">Hembra</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Pet Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <p className="text-gray-600">
              Mostrando {filteredPets.length} de {pets.length} mascotas
            </p>
          </div>
          {loading ? (
            <div className="text-center py-12">Cargando mascotas...</div>
          ) : error ? (
            <div className="text-center py-12 text-red-600">{error}</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPets.map((pet) => (
                <Card key={pet.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <Image
                      src={pet.images?.[0]?.url || "/placeholder.svg"}
                      alt={pet.nickname}
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover"
                    />
                    {/* No hay campo urgente */}
                    <Button size="icon" variant="secondary" className="absolute top-3 right-3 bg-white/90 hover:bg-white">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{pet.nickname}</CardTitle>
                        <p className="text-gray-600">
                          {pet.breed} • {pet.birthdate ? `${Math.max(0, new Date().getFullYear() - new Date(pet.birthdate).getFullYear())} años` : ""}
                        </p>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {pet.type === "dog" ? "Perro" : pet.type === "cat" ? "Gato" : pet.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700 text-sm line-clamp-3">{pet.descriptionHistory}</p>

                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {pet.sex === "male" ? "♂ Macho" : "♀ Hembra"}
                      </Badge>
                      <Badge variant="secondary" className="text-xs capitalize">
                        {pet.size === "small"
                          ? "Pequeño"
                          : pet.size === "medium"
                          ? "Mediano"
                          : pet.size === "large"
                          ? "Grande"
                          : pet.size}
                      </Badge>
                      {/* No hay campo vaccinated */}
                      {pet.isSterilized && (
                        <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                          Esterilizado
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      Arequipa
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-1" />
                      Nacimiento: {pet.birthdate ? new Date(pet.birthdate).toLocaleDateString("es-ES") : "Desconocido"}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button className="flex-1 bg-teal-600 hover:bg-teal-700">
                        <PawPrint className="h-4 w-4 mr-2" />
                        Adoptar
                      </Button>
                      <Button variant="outline" className="flex-1" asChild>
                        <Link href={`/mascotas/${pet.id}`}>Ver Más</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!loading && filteredPets.length === 0 && (
            <div className="text-center py-12">
              <PawPrint className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No se encontraron mascotas</h3>
              <p className="text-gray-600">Intenta ajustar los filtros de búsqueda</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}