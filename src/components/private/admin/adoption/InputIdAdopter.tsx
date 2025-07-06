"use client"

import { Input } from "@/components/ui/input"

interface Props extends React.ComponentProps<"input"> {
  onValueChange: (value?: number) => void;
}

export default function InputIdAdopter({ onValueChange, ...props }: Props) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1">ID Adoptante</label>
      <Input
        type="number"
        placeholder="ID Adoptante"
        onChange={(e) => {
          onValueChange?.(e.target.value ? parseInt(e.target.value): undefined);
          props.onChange?.(e); // opcional: seguir permitiendo onChange nativo
        }}
        {...props}
      />
    </div>
  )
}

