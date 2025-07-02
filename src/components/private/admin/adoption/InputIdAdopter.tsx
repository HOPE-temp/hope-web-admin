"use client"

import { Input } from "@/components/ui/input"

interface Props {
  value: string
  onChange: (value: string) => void
}

export default function InputIdAdopter({ value, onChange }: Props) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1">ID Adoptante</label>
      <Input
        type="text"
        placeholder="ID Adoptante"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

