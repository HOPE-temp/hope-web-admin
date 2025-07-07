"use client"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAlertUIStore } from "@/lib/stores/alert.store";
import { cn } from "@/lib/utils";
import { Terminal } from "lucide-react";

export function GlobalAlert() {
  const { open, title, description, variant } = useAlertUIStore();

  if (!open) return null;

  return (
    <div className="fixed bottom-4 right-4 w-[300px] z-50">
      <Alert variant={variant} className={cn("shadow-lg")}>
        <Terminal className="h-5 w-5" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
    </div>
  );
}