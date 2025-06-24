import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PawPrint, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Header from "@/components/home/header"
import Footer from "@/components/home/footer"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto text-center">
          <CardHeader>
            <div className="mx-auto bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <PawPrint className="h-8 w-8 text-teal-600" />
            </div>
            <CardTitle className="text-2xl">Mascota no encontrada</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">Lo sentimos, no pudimos encontrar la mascota que buscas.</p>
            <Button asChild className="bg-teal-600 hover:bg-teal-700">
              <Link href="/mascotas">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver a Mascotas
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
