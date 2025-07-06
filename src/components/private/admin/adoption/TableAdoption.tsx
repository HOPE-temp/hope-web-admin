"use client"

import { useEffect, useState } from "react"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"

import InputIdAdopter from "./InputIdAdopter"
import InputDniAdopter from "./InputDniAdopter"
import SelectEsSolicitud from "./SelectEsSolicitud"
import SelectEsResult from "./SelectEsResult"

import { ClipboardList, Paperclip, CheckSquare } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { findAllAdoptions } from "@/services/hopeBackend/adoptiones"
import { formatDate } from "@/lib/format/formatDate"
import { Button } from "@/components/ui/button"

import DialogEvaluation from "./DialogEvaluation"
import DialogLinked from "./DialogLinked"
import DialogComplete from "./DialogComplete"


interface Props {
  data?: Adoption[]
}

export default function TableAdoption({ data }: Props) {

  const {axios} = useAuth()
  const [adoptions, setAdoptions] = useState<Adoption[]>()
  const [filter, setFilter] = useState<FilterAdoptionDto>({
    limit: 10,
    offset: 5
  })


  const getAdoptions = async ()=>{

    if(axios){
      console.log({filter})
      const data = await findAllAdoptions(axios, filter)
      console.log({data})
      setAdoptions(data)
    }

  }

  useEffect(()=> {
    getAdoptions()
  }, [axios, filter])
  console.log(adoptions)

  const handleResetButton = () => {
    setFilter({
      limit: 10,
      offset: 5,
    })
  }

  return (
    <div className="border p-6 rounded-md space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Adopciones</h2>
        <button
          onClick={onRegisterClick}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          + Registrar Adopción
        </button>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <InputIdAdopter 
          value={filter.idAdopter}
          onValueChange={(value)=>setFilter({...filter, idAdopter:value})}
        />
        <SelectEsResult
          value={filter.statusResult}
          onChange={(value)=> setFilter({...filter, statusResult: value })}
        />
        <SelectEsSolicitud
          value={filter.statusRequest}
          onChange={(value)=>setFilter({...filter, statusRequest: value})}
          />
        <InputDniAdopter
          value={filter.documentNumber}
          onValueChange={(value)=>setFilter({...filter, documentNumber: value})}
        />
      </div>
      <div>
        <Button onClick={handleResetButton}>
          Resetear
        </Button>
      </div>

      {/* Tabla */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Estado Resultado</TableHead>
            <TableHead>Estado Solicitud</TableHead>
            <TableHead>Fecha evaluación</TableHead>
            <TableHead>Fecha selección</TableHead>
            <TableHead className="text-center">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {adoptions && adoptions.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.statusResult}</TableCell>
              <TableCell>{item.statusRequest}</TableCell>
              <TableCell>{formatDate(item.reviewRequestAt )}</TableCell>
              <TableCell>{formatDate(item.selectedAnimalAt)}</TableCell>
              <TableCell className="flex justify-center gap-3">
                <DialogEvaluation onSubmit={(data) => console.log("Evaluar:", data)} />
                <DialogLinked onSubmit={(data) => console.log("Vincular:", data)} />
                <DialogComplete onSubmit={(data) => console.log("Completar:", data)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
