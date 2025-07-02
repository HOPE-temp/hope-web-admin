export default function TabRequisitos() {
  return (
    <div className="space-y-6">
      {/* Requisitos generales */}
      <section>
        <h2 className="text-xl font-semibold text-green-700 mb-3">Requisitos Generales</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Ser mayor de edad con DNI vigente.</li>
          <li>Compromiso de esterilización en caso sea necesario.</li>
          <li>Tener espacio adecuado y seguro para la mascota.</li>
          <li>Contar con tiempo y recursos para su alimentación y cuidado.</li>
          <li>Firmar el contrato de adopción y aceptar seguimientos.</li>
        </ul>
      </section>

      {/* Consideraciones importantes */}
      <section>
        <h2 className="text-xl font-semibold text-green-700 mb-3">Consideraciones Importantes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>La adopción es un compromiso de por vida, no una moda.</li>
          <li>Se evaluará el entorno familiar y estilo de vida del adoptante.</li>
          <li>El proceso puede incluir visitas domiciliarias previas.</li>
          <li>HOPE se reserva el derecho de aprobar o rechazar la solicitud.</li>
        </ul>
      </section>
    </div>
  )
}

