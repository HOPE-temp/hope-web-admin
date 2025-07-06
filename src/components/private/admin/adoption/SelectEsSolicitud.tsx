"use client"

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

interface Props {
  value?: StatusRequestApotion | 'all'
  onChange: (value: StatusRequestApotion) => void
}

export default function SelectEsSolicitud({ value, onChange }: Props) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1">Estado Solicitud {value}d</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger value={undefined}>
          <SelectValue placeholder="Seleccionar" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={'created'}>Creado</SelectItem>
          <SelectItem value={'cancelled'}>Cancelado</SelectItem>
          <SelectItem value={'adoption_completed'}>Finalizado</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

