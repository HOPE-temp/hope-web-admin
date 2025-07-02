"use client"

import { useState } from "react"

export default function TabFormulario() {
  const [form, setForm] = useState({
    ocupacion: "",
    estabilidad: "",
    tieneNinos: "",
    responsabilidadNinos: "",
    animalesCasa: "",
    cuidadosMascotas: "",
    tiempoPaciencia: "",
    esterilizacion: "",
    lugarMascota: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Formulario de evaluación enviado:", form)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 border rounded shadow max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">Formulario de solicitud de Adopción</h2>
        <p className="text-gray-500 text-sm">Completa este formulario para iniciar tu proceso de adopción.</p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-gray-700 font-medium mb-1">¿A qué se dedica?</label>
          <input
            name="ocupacion"
            value={form.ocupacion}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Describa a qué se dedica para asegurarnos de la estabilidad económica para enfrentar cualquier eventualidad
          </label>
          <textarea
            name="estabilidad"
            value={form.estabilidad}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">¿Tiene niños menores de 5 años en casa?</label>
          <div className="space-x-4">
            <label>
              <input
                type="radio"
                name="tieneNinos"
                value="Si"
                checked={form.tieneNinos === "Si"}
                onChange={() => handleRadioChange("tieneNinos", "Si")}
              />{" "}
              Sí
            </label>
            <label>
              <input
                type="radio"
                name="tieneNinos"
                value="No"
                checked={form.tieneNinos === "No"}
                onChange={() => handleRadioChange("tieneNinos", "No")}
              />{" "}
              No
            </label>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Describa la responsabilidad que tiene con los niños en casa</label>
          <input
            name="responsabilidadNinos"
            value={form.responsabilidadNinos}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Describa a los animales que tiene en casa</label>
          <input
            name="animalesCasa"
            value={form.animalesCasa}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            ¿Cómo mantiene a sus mascotas en casa? (alimentación, espacio, atención veterinaria)
          </label>
          <textarea
            name="cuidadosMascotas"
            value={form.cuidadosMascotas}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            ¿Cuenta con el tiempo y la paciencia necesarios para cuidar a esta mascota?
          </label>
          <div className="space-x-4">
            <label>
              <input
                type="radio"
                name="tiempoPaciencia"
                value="Si"
                checked={form.tiempoPaciencia === "Si"}
                onChange={() => handleRadioChange("tiempoPaciencia", "Si")}
              />{" "}
              Sí
            </label>
            <label>
              <input
                type="radio"
                name="tiempoPaciencia"
                value="No"
                checked={form.tiempoPaciencia === "No"}
                onChange={() => handleRadioChange("tiempoPaciencia", "No")}
              />{" "}
              No
            </label>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            ¿Se compromete a esterilizar al animal adoptado? (en caso de no estar esterilizado)
          </label>
          <input
            name="esterilizacion"
            value={form.esterilizacion}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Describa el lugar donde vivirá la mascota (casa, departamento, patio, etc.)
          </label>
          <input
            name="lugarMascota"
            value={form.lugarMascota}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
      </div>

      {/* Botones */}
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded"
        >
          Atrás
        </button>
        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
        >
          Enviar Solicitud
        </button>
      </div>
    </form>
  )
}

