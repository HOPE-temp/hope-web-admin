"use client";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { PawPrint, Users, Heart } from "lucide-react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { usePanel } from "@/hooks/usePanel"

export default function Home() {
  const router = useRouter()
  const { counts, loading, error } = usePanel() 
  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (!token) router.push('/login')
  }, [router])

  return (    
      <div className="space-y-6 p-6">
        <h1 className="text-3xl font-bold">Panel de Control</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Mascotas Rescatadas</CardTitle>
              <PawPrint className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? "..." : counts?.animal ?? 0}
              </div>
              <p className="text-xs text-muted-foreground">Mascotas en el albergue</p>
              <Button asChild className="w-full mt-4" size="sm">
                <Link href="animales">Ver mascotas</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Adoptantes</CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? "..." : counts?.adopter ?? 0}
              </div>
              <p className="text-xs text-muted-foreground">Adoptantes registrados</p>
              <Button asChild className="w-full mt-4" size="sm">
                <Link href="admin/adoptantes">Ver adoptantes</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Adopciones</CardTitle>
              <Heart className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? "..." : counts?.adoption ?? 0}
              </div>
              <p className="text-xs text-muted-foreground">Adopciones realizadas</p>
              <Button asChild className="w-full mt-4" size="sm">
                <Link href="/adopciones">Ver adopciones</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        {error && (
          <div className="text-red-500 text-center">{error}</div>
        )}
      </div>    
  )
}
