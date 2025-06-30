"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X, Printer } from "lucide-react"
import { cn } from "@/lib/utils"

export function DialogRed({
  data,
  onClose,
}: {
  data: any
  onClose: () => void
}) {
  const printRef = React.useRef<HTMLDivElement>(null)

  const handlePrint = () => {
    const printContents = printRef.current?.innerHTML
    if (printContents) {
      const printWindow = window.open("", "", "width=800,height=600")
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Comprobante del CHEQUEO MEDICO</title>
              <style>
                body {
                  font-family: sans-serif;
                  padding: 20px;
                  background: white;
                }
                h2 {
                  text-align: center;
                  margin-bottom: 20px;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-top: 10px;
                }
                td {
                  padding: 8px;
                  border: 1px solid #ccc;
                }
                .label {
                  font-weight: bold;
                  background: #f9f9f9;
                }
              </style>
            </head>
            <body onload="window.print(); window.close();">
              ${printContents}
            </body>
          </html>
        `)
        printWindow.document.close()
      }
    }
  }

  return (
    <DialogPrimitive.Root open onOpenChange={onClose}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Detalle Chequeo Médico</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="text-blue-600 hover:text-blue-800"
                title="Imprimir"
              >
                <Printer className="w-5 h-5" />
              </button>
              <DialogPrimitive.Close className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </DialogPrimitive.Close>
            </div>
          </div>
          <div ref={printRef}>
            <table className="w-full text-sm">
              <tbody>
                {[
                  { label: "Estado:", value: data.estado },
                  { label: "Fecha Inicio:", value: data.fechaInicio },
                  { label: "Fecha Fin:", value: data.fechaFin },
                  { label: "Id Mascota:", value: data.idmascota },
                  { label: "Peso:", value: data.peso },
                  { label: "Temperatura:", value: data.temperatura },
                  { label: "Observaciones:", value: data.observaciones },
                  { label: "Diagnóstico:", value: data.diagnostico },
                  { label: "Tratamiento:", value: data.tratamiento },
                  { label: "Monto:", value: data.monto },
                ].map(({ label, value }) => (
                  <tr key={label}>
                    <td className="label w-1/3">{label}</td>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
