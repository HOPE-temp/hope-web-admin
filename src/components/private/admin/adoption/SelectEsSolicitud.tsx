"use client"

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

interface Props {
  value: string
  onChange: (value: string) => void
}

export default function SelectEsSolicitud({ value, onChange }: Props) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1">Estado Solicitud</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Todos" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="No evaluado">No evaluado</SelectItem>
          <SelectItem value="Aprobado">Aprobado</SelectItem>
          <SelectItem value="Rechazado">Rechazado</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
