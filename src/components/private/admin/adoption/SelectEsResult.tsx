"use client"

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { SelectItemIndicator } from "@radix-ui/react-select"

interface Props {
  value?: StatusResultApotion | 'all'
  onChange: (value: StatusResultApotion) => void
}

export default function SelectEsResult({ value, onChange }: Props) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1">Estado Solicitud</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Seleccionar" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={'not_evaluated'}>No evaluado</SelectItem>
          <SelectItem value={'approved'}>Aprobado</SelectItem>
          <SelectItem value={'rejected'}>Rechazado</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
