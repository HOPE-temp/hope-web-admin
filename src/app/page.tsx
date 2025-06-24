import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Award, Users, PawPrint, Shield, Scale, Lightbulb } from "lucide-react"
import Image from "next/image"
import Header from "@/components/home/header"
import Footer from "@/components/home/footer"
import StatsCard from "@/components/home/stats-card"
import SuccessStory from "@/components/home/success-story"
import ActivityCard from "@/components/home/activity-card"
import ContactForm from "@/components/home/contact-form"
import ContactMap from "@/components/home/contact-map"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section id="inicio" className="py-20 bg-gradient-to-r from-teal-600 to-teal-800 text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-yellow-500 text-yellow-900 hover:bg-yellow-400">
                <Award className="h-4 w-4 mr-2" />
                Ganadores Premio "El Búho" 2023
              </Badge>
              <h1 className="text-5xl font-bold leading-tight">
                10 Años Rescatando
                <span className="text-yellow-300"> Vidas</span>
              </h1>
              <p className="text-xl text-teal-100 leading-relaxed">
                La Asociación de Protección y Bienestar Ambiental – Animal HOPE ha rescatado, tratado y puesto en
                adopción a más de <strong>13,000 animales</strong> en condiciones deplorables en Arequipa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-400 text-yellow-900">
                  <PawPrint className="h-5 w-5 mr-2" />
                  Ver Mascotas
                </Button>
                <Button
                  size="lg"
                  
                  className="border-white text-white hover:bg-white hover:text-teal-600"
                >
                  Contactanos
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/albergue.jpg"
                alt="Perros rescatados en HOPE Arequipa"
                width={600}
                height={500}
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Heart className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">13,000+</p>
                    <p className="text-sm text-gray-600">Animales Rescatados</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <StatsCard
              icon={<PawPrint className="h-8 w-8 text-teal-600" />}
              value="13,000+"
              label="Animales Rescatados"
              bgColor="bg-teal-100"
            />
            <StatsCard
              icon={<Heart className="h-8 w-8 text-green-600" />}
              value="10"
              label="Años de Experiencia"
              bgColor="bg-green-100"
            />
            <StatsCard
              icon={<Award className="h-8 w-8 text-yellow-600" />}
              value="2023"
              label='Premio "El Búho"'
              bgColor="bg-yellow-100"
            />
            <StatsCard
              icon={<Users className="h-8 w-8 text-purple-600" />}
              value="100%"
              label="Autofinanciado"
              bgColor="bg-purple-100"
            />
          </div>
        </div>
      </section>

      {/* Sobre Nosotros */}
      <section id="nosotros" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Hania Rodriguez, cofundadora de HOPE"
                width={500}
                height={400}
                className="rounded-2xl shadow-lg"
              />
            </div>
            <div className="space-y-6">
              <Badge className="bg-teal-100 text-teal-800">Nuestra Historia</Badge>
              <h2 className="text-4xl font-bold text-gray-900">
                Una Misión de <span className="text-teal-600">Amor y Dedicación</span>
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                <strong>Hania Rodriguez</strong>, una de nuestras cofundadoras, lidera día a día este albergue que se
                autofinancia. A pesar de ofrecer ayuda como campañas de esterilización gratuitas, enfrentamos el desafío
                de que ni las autoridades ni la población colaboran suficientemente en el control de la población animal
                abandonada.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Nuestro trabajo ha sido reconocido con el <strong>Premio "El Búho" 2023 </strong>
                 en la categoría de Responsabilidad Social, un reconocimiento que nos motiva a seguir adelante en nuestra
                misión.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nuestra Misión y Visión</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trabajamos cada día para crear un mundo mejor para los animales abandonados
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-l-4 border-l-teal-600">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Heart className="h-6 w-6 mr-3 text-teal-600" />
                  Misión
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-700 leading-relaxed">
                  HOPE Arequipa se enfoca en mejorar la calidad de vida de los animales, independientemente de su estado
                  o origen, brindando ayuda y apoyo integral para su recuperación y bienestar.
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-green-600">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Lightbulb className="h-6 w-6 mr-3 text-green-600" />
                  Visión
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Ser un referente en la protección animal, trabajando de manera legal y respetuosa, promoviendo la
                  denuncia y exigiendo justicia por los animales en nuestra comunidad.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Actividades */}
      <section className="py-20 bg-teal-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nuestras Actividades</h2>
            <p className="text-xl text-gray-600">Trabajamos en múltiples frentes para proteger a los animales</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <ActivityCard
              icon={<Scale className="h-6 w-6 text-red-600" />}
              title="Denuncia y Justicia"
              description="Nos comprometemos a denunciar situaciones de maltrato animal y exigir justicia, trabajando con las autoridades dentro del marco legal."
              bgColor="bg-red-100"
            />
            <ActivityCard
              icon={<Shield className="h-6 w-6 text-green-600" />}
              title="Rescate y Bienestar"
              description="Nos dedicamos al rescate y bienestar de animales abandonados o maltratados, brindándoles atención médica y cuidado integral."
              bgColor="bg-green-100"
            />
            <ActivityCard
              icon={<Users className="h-6 w-6 text-teal-600" />}
              title="Conciencia Colectiva"
              description="Promovemos la conciencia sobre el bienestar animal, fomentando el respeto y la responsabilidad hacia los animales en nuestra comunidad."
              bgColor="bg-teal-100"
            />
          </div>
        </div>
      </section>

      {/* Historias de Éxito */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Historias de Éxito</h2>
            <p className="text-xl text-gray-600">Cada rescate es una historia de esperanza y amor</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <SuccessStory
              name="Max: De la Calle al Hogar"
              date="Rescatado en 2023"
              description="Max fue encontrado desnutrido y con heridas graves. Después de meses de tratamiento y amor, encontró una familia que lo adora. Hoy es un perro feliz y saludable."
              imageUrl="/placeholder.svg?height=200&width=300"
              imageAlt="Max, perro rescatado"
            />
            <SuccessStory
              name="Luna: Una Segunda Oportunidad"
              date="Rescatada en 2022"
              description="Luna llegó a nosotros muy asustada y enferma. Con paciencia y cuidados veterinarios, se recuperó completamente. Ahora vive con una familia amorosa que la cuida como se merece."
              imageUrl="/placeholder.svg?height=200&width=300"
              imageAlt="Luna, gata rescatada"
            />
            <SuccessStory
              name="Los Cinco Hermanos"
              date="Rescatados en 2024"
              description="Cinco cachorros abandonados en una caja fueron rescatados y rehabilitados. Todos encontraron hogares amorosos y ahora son parte de familias que los aman incondicionalmente."
              imageUrl="/placeholder.svg?height=200&width=300"
              imageAlt="Familia de cachorros rescatados"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">¡Únete a Nuestra Misión!</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Cada donación, cada adopción, cada acto de amor marca la diferencia en la vida de un animal que necesita
            nuestra ayuda. Sé parte del cambio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-400 text-yellow-900">
              <Heart className="h-5 w-5 mr-2" />
              Donar Ahora
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-teal-600">
              <PawPrint className="h-5 w-5 mr-2" />
              Ver Adopciones
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-teal-600">
              Ser Voluntario
            </Button>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Contáctanos</h2>
            <p className="text-xl text-gray-600">Estamos aquí para ayudarte y responder tus preguntas</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <ContactForm />
            <ContactMap />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

