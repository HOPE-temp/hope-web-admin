"use client"

import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export default function Header() {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<header className="bg-white shadow-sm sticky top-0 z-50">
			<div className="container mx-auto px-4 py-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-3">
						<div className="bg-teal-600 p-2 rounded-full">
							<Heart className="h-6 w-6 text-white" />
						</div>
						<div>
							<h1 className="text-2xl font-bold text-teal-900">HOPE</h1>
							<p className="text-sm text-gray-600">Arequipa</p>
						</div>
					</div>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex space-x-6">
						<Link
							href="/"
							className="text-gray-700 hover:text-teal-600 transition-colors"
						>
							Inicio
						</Link>
						<Link
							href="/#nosotros"
							className="text-gray-700 hover:text-teal-600 transition-colors"
						>
							Nosotros
						</Link>
						<Link
							href="/mascotas"
							className="text-gray-700 hover:text-teal-600 transition-colors"
						>
							Mascotas
						</Link>
						<Link
							href="#adopcion"
							className="text-gray-700 hover:text-teal-600 transition-colors"
						>
							Adopción
						</Link>
						<Link
							href="#donaciones"
							className="text-gray-700 hover:text-teal-600 transition-colors"
						>
							Donaciones
						</Link>
						<Link
							href="/#contacto"
							className="text-gray-700 hover:text-teal-600 transition-colors"
						>
							Contacto
						</Link>
					</nav>

					{/* Mobile Navigation */}
					<div className="md:hidden">
						<Sheet open={isOpen} onOpenChange={setIsOpen}>
							<SheetTrigger asChild>
								<Button variant="ghost" size="icon">
									<Menu className="h-6 w-6" />
									<span className="sr-only">Abrir menú</span>
								</Button>
							</SheetTrigger>
							<SheetContent side="right">
								<nav className="flex flex-col gap-4 mt-8">
									<Link
										href="#inicio"
										className="text-lg font-medium hover:text-teal-600"
										onClick={() => setIsOpen(false)}
									>
										Inicio
									</Link>
									<Link
										href="#nosotros"
										className="text-lg font-medium hover:text-teal-600"
										onClick={() => setIsOpen(false)}
									>
										Nosotros
									</Link>
									<Link
										href="/mascotas"
										className="text-lg font-medium hover:text-teal-600"
										onClick={() => setIsOpen(false)}
									>
										Mascotas
									</Link>
									<Link
										href="#adopcion"
										className="text-lg font-medium hover:text-teal-600"
										onClick={() => setIsOpen(false)}
									>
										Adopción
									</Link>
									<Link
										href="#donaciones"
										className="text-lg font-medium hover:text-teal-600"
										onClick={() => setIsOpen(false)}
									>
										Donaciones
									</Link>
									<Link
										href="#contacto"
										className="text-lg font-medium hover:text-teal-600"
										onClick={() => setIsOpen(false)}
									>
										Contacto
									</Link>
								</nav>
							</SheetContent>
						</Sheet>
					</div>

					<div className="hidden md:flex items-center space-x-3">
						<Link href="/login">
							<Button
								variant="outline"
								className="border-teal-600 text-teal-600 hover:bg-teal-50"
							>
								Iniciar Sesión
							</Button>
						</Link>
						<Button className="bg-teal-600 hover:bg-teal-700">
							<Heart className="h-4 w-4 mr-2" />
							Donar Ahora
						</Button>
					</div>
				</div>
			</div>
		</header>
	)
}
