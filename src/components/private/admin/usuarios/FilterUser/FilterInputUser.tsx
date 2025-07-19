"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, X } from "lucide-react"

interface FilterInputUserProps {
  onGetData: (params: FilterUserDto) => void
}

export function FilterInputUser({ onGetData }: FilterInputUserProps) {
  const [search, setSearch] = useState("")
  const [rol, setRol] = useState<string>("all")

  const handleSearch = () => {
    const params: FilterUserDto = {}

    if (search.trim()) {
      params.search = search.trim()
    }

    if (rol !== "all") {
      params.rol = rol
    }

    onGetData(params)
  }

  const handleClear = () => {
    setSearch("")
    setRol("all")
    onGetData({})
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre, email o usuario..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-8"
          />
        </div>
      </div>

      <Select value={rol} onValueChange={setRol}>
        <SelectTrigger className="w-[180px]">
          <Filter className="h-4 w-4 mr-2" />
          <SelectValue placeholder="Filtrar por rol" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los roles</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="moderator">Moderador</SelectItem>
          <SelectItem value="user">Usuario</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex gap-2">
        <Button onClick={handleSearch} size="sm">
          <Search className="h-4 w-4 mr-2" />
          Buscar
        </Button>
        <Button onClick={handleClear} variant="outline" size="sm">
          <X className="h-4 w-4 mr-2" />
          Limpiar
        </Button>
      </div>
    </div>
  )
}
