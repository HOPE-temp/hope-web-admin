"use client"

import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export function DialogDelete({
  onConfirm,
  children,
}: {
  onConfirm: () => void
  children: React.ReactNode
}) {
  return (
    <AlertDialogPrimitive.Root>
      <AlertDialogPrimitive.Trigger asChild>
        {children}
      </AlertDialogPrimitive.Trigger>

      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay className="fixed inset-0 bg-black/60 z-50" />
        <AlertDialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
          <AlertDialogPrimitive.Title className="text-lg font-semibold mb-2">
            Confirmar eliminación
          </AlertDialogPrimitive.Title>
          <AlertDialogPrimitive.Description className="text-sm text-muted-foreground mb-4">
            ¿Estás seguro de que deseas eliminar este registro? Esta acción no se puede deshacer.
          </AlertDialogPrimitive.Description>
          <div className="flex justify-end space-x-2">
            <AlertDialogPrimitive.Cancel
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Cancelar
            </AlertDialogPrimitive.Cancel>
            <AlertDialogPrimitive.Action
              onClick={() => {
                onConfirm()
                toast.success("Registro eliminado correctamente")
              }}
              className={cn(buttonVariants({ variant: "destructive" }))}
            >
              Eliminar
            </AlertDialogPrimitive.Action>
          </div>
        </AlertDialogPrimitive.Content>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  )
}

