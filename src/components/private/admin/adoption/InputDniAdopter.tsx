"use client"

import { Input } from "@/components/ui/input"

interface Props {
  value: string
  onChange: (value: string) => void
}

export default function InputDniAdopter({ value, onChange }: Props) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1">DNI Adoptante</label>
      <Input
        type="text"
        placeholder="DNI Adoptante"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

