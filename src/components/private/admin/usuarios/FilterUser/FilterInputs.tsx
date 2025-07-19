"use client"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface FilterInputsProps {
  globalFilter: string
  onGlobalFilterChange: (value: string) => void
  rolFilter?: string
  onRolFilterChange: (value: string | undefined) => void
  locationFilter?: string
  onLocationFilterChange: (value: string | undefined) => void
  onClearFilters: () => void
}

export function FilterInputs({
  globalFilter,
  onGlobalFilterChange,
  rolFilter,
  onRolFilterChange,
  locationFilter,
  onLocationFilterChange,
  onClearFilters,
}: FilterInputsProps) {
  const hasActiveFilters = globalFilter || rolFilter || locationFilter

  return (
    <div className="flex flex-col sm:flex-row gap-4 py-4">
      <Input
        placeholder="Buscar usuario, nombre, apellido o DNI..."
        value={globalFilter}
        onChange={(e) => onGlobalFilterChange(e.target.value)}
        className="max-w-sm"
      />

      <Select value={rolFilter} onValueChange={onRolFilterChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filtrar por rol" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="admin">Administrador</SelectItem>
          <SelectItem value="volunteer">Voluntario</SelectItem>
          <SelectItem value="veterinarian">Veterinario</SelectItem>
        </SelectContent>
      </Select>

      <Input
        placeholder="Filtrar por ubicación..."
        value={locationFilter || ""}
        onChange={(e) => onLocationFilterChange(e.target.value || undefined)}
        className="max-w-sm"
      />

      {hasActiveFilters && (
        <Button variant="outline" onClick={onClearFilters} className="flex items-center gap-2 bg-transparent">
          <X className="w-4 h-4" />
          Limpiar filtros
        </Button>
      )}
    </div>
  )
}
