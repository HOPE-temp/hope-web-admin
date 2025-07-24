'use client';

import { useState } from 'react';

export default function TabDatosPersonales() {
  const [form, setForm] = useState({
    nombres: '',
    apellidos: '',
    dni: '',
    celular: '',
    email: '',
    distrito: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 border rounded shadow max-w-4xl mx-auto space-y-6"
    >
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">
          Datos Personales
        </h2>
        <p className="text-gray-500 text-sm">
          Completa este formulario con tus datos personales.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Información Personal
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="nombres"
            placeholder="Nombre"
            value={form.nombres}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            name="apellidos"
            placeholder="Apellido"
            value={form.apellidos}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            name="dni"
            placeholder="DNI"
            value={form.dni}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            name="celular"
            placeholder="N° Celular"
            value={form.celular}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={form.email}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            name="distrito"
            placeholder="Distrito"
            value={form.distrito}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
      </div>

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
          Continuar
        </button>
      </div>
    </form>
  );
}
