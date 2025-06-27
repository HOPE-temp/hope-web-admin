import React from "react"
import { Printer } from "lucide-react"

export function ButtonPrint() {
  const handlePrint = () => {
    window.print()
  }

  return (
    <button onClick={handlePrint} className="border px-4 py-2 rounded flex items-center gap-2">
      <Printer size={18} />
      Imprimir
    </button>
  )
}
