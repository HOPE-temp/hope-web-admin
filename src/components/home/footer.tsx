import { Heart, Phone, Mail, MapPin } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-teal-600 p-2 rounded-full">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">HOPE</h3>
                <p className="text-sm text-gray-400">Arequipa</p>
              </div>
            </div>
            <p className="text-gray-400">10 años rescatando y protegiendo animales abandonados en Arequipa.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Adopción
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Donaciones
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Voluntariado
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Historias
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Servicios</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Esterilización
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Atención Veterinaria
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Rescate
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Rehabilitación
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Arequipa, Perú</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+51 XXX XXX XXX</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@hopearequipa.org</span>
              </div>
            </div>
          </div>
        </div>
        <Separator className="my-8 bg-gray-800" />
        <div className="text-center text-gray-400">
          <p>&copy; 2024 HOPE Arequipa. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
