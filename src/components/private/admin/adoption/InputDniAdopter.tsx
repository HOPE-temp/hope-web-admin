"use client"

import { Input } from "@/components/ui/input"

interface Props extends React.ComponentProps<"input"> {
  onValueChange?: (value: string) => void;
}

export default function InputDniAdopter({ onValueChange, ...props }: Props) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1">DNI Adoptante</label>
      <Input
        type="text"
        placeholder="DNI Adoptante"
        onChange={(e) => {
          onValueChange?.(e.target.value);
          props.onChange?.(e); // opcional: seguir permitiendo onChange nativo
        }}
        {...props}
      />
    </div>
  )
}

