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

export default function SelectEsResult({ value, onChange }: Props) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1">Estado Resultado</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Todos" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="Creado">Creado</SelectItem>
          <SelectItem value="Cancelado">Cancelado</SelectItem>
          <SelectItem value="Finalizado">Finalizado</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
