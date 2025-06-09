import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from "@/components/ui/label"
import { FaEnvelope } from "react-icons/fa"

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="w-full max-w-sm space-y-6 border border-gray-300 rounded-xl bg-white shadow-lg p-8">
        <div className="flex flex-col items-center space-y-2 pt-6">
          <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-200">
            <FaEnvelope className="w-10 h-10" style={{ color: "#5DBFA7" }} />
          </span>
          <h2 className="text-2xl font-semibold text-gray-700">Recuperar Contraseña</h2>
          <p className="text-sm text-gray-500 text-center">
            Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.
          </p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              required
            />
          </div>
        </div>
        <Button type="submit" className="w-full">
          Enviar instrucciones
        </Button>
        <div className="text-center">
          <a href="/login" className="text-sm text-[#5DBFA7] hover:underline">
            Volver al login
          </a>
        </div>
      </form>
    </main>
  )
}