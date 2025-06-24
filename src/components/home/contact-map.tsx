import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ContactMap() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl text-teal-900">Nuestra Ubicación</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative h-96 bg-gray-200 rounded-b-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3827.311749951707!2d-71.5377137!3d-16.408986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91424b77f6d1824d%3A0xd3e84f50603c4519!2sHOPE-%20ASOCIACI%C3%93N%20DE%20PROTECCI%C3%93N%20Y%20BIENESTAR%20AMBIENTAL%20-%20ANIMAL!5e0!3m2!1ses-419!2spe!4v1750720076975!5m2!1ses-419!2spe"
            style={{ border: 0, width: "100%", height: "100%" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="p-6">
          <div className="bg-teal-50 p-4 rounded-lg">
            <h4 className="font-semibold text-teal-900 mb-2">Cómo Llegar</h4>
            <p className="text-sm text-gray-700">
              Estamos ubicados en el corazón de Arequipa, en una zona de fácil acceso y rodeada de servicios. Nuestra dirección se encuentra a pocos pasos de la Av. Mariscal Cáceres y cerca del Estadio Melgar.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
