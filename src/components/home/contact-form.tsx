"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { useState } from "react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-teal-900">Envíanos un Mensaje</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre Completo</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Tu nombre completo"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="tu@email.com"
                  required
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="+51 XXX XXX XXX"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Asunto</Label>
                <Select onValueChange={(value) => handleChange("subject", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un asunto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="adopcion">Adopción</SelectItem>
                    <SelectItem value="donacion">Donación</SelectItem>
                    <SelectItem value="voluntariado">Voluntariado</SelectItem>
                    <SelectItem value="rescate">Reportar Rescate</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Mensaje</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                placeholder="Cuéntanos cómo podemos ayudarte..."
                rows={5}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
              Enviar Mensaje
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-teal-900">Información de Contacto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="bg-teal-100 p-2 rounded-full">
              <MapPin className="h-5 w-5 text-teal-600" />
            </div>
            <div>
              <p className="font-medium">Dirección</p>
              <p className="text-gray-600">C. Jacinto Ibañez 102, Arequipa 04001</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-teal-100 p-2 rounded-full">
              <Phone className="h-5 w-5 text-teal-600" />
            </div>
            <div>
              <p className="font-medium">Teléfono</p>
              <p className="text-gray-600">+51 989 769 292</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-teal-100 p-2 rounded-full">
              <Mail className="h-5 w-5 text-teal-600" />
            </div>
            <div>
              <p className="font-medium">Email</p>
              <p className="text-gray-600">info@hopearequipa.org</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-teal-100 p-2 rounded-full">
              <Clock className="h-5 w-5 text-teal-600" />
            </div>
            <div>
              <p className="font-medium">Horarios de Atención</p>
              <p className="text-gray-600">Lun - Sáb: 8:00 AM - 6:00 PM</p>
              <p className="text-gray-600">Dom: 9:00 AM - 4:00 PM</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
