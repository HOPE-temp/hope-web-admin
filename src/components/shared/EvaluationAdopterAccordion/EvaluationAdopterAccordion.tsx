'use client';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';

import { useEffect, useState } from 'react';
import { PlusSquare, Text } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { findEvaluationsByAdopter } from '@/services/hopeBackend/evaluations';
import { format } from 'date-fns';

interface Props {
  id: number;
  onUpdated?: () => void;
  openExternal?: boolean;
  triggerVisibled?: boolean;
}

export function EvaluationAdopterAccordion({
  id,
  onUpdated,
  triggerVisibled = true,
  openExternal = false,
}: Props) {
  const { axios } = useAuth();
  const [open, setOpen] = useState(false);
  const [evals, setEvals] = useState<Evaluation[]>([]);

  const getEvaluations = async () => {
    const evals = await findEvaluationsByAdopter(axios, id);
    setEvals(evals);
  };

  useEffect(() => {
    if (id) {
      getEvaluations();
    }
  }, [id]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {triggerVisibled && (
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="lg"
            title="Evaluaciones del adoptante."
            className=" text-black"
          >
            <Text />
            Todas las evaluaciones
          </Button>
        </DialogTrigger>
      )}

      <DialogContent aria-describedby={undefined} className="min-w-[50vw]">
        <DialogHeader>
          <DialogTitle className="text-center w-full">
            Evaluación de Solicitud de Adopción
          </DialogTitle>
          <Accordion
            type="single"
            collapsible
            className="w-full h-[80vh] h-max-[80vh] overflow-scroll"
            defaultValue={`item-0`}
          >
            {evals.length > 0 ? (
              evals.map((item, idx) => (
                <AccordionItem value={`item-${idx}`}>
                  <AccordionTrigger className="bg-slate-200 p-2 my-2 rounded-sm">
                    <b className="text-lg">
                      {idx === 0 ? 'Ultima evaluación' : 'Evaluación'} -{' '}
                      {format(new Date(item.createdAt), 'yyyy-MM-dd hh:mm')}
                    </b>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col  gap-4 text-balance sm:p-4 text-left ">
                    <b>¿A qué se dedica?</b>
                    <span>{item.profession}</span>
                    <b>
                      Describa a qué se dedica para asegurarnos de la
                      estabilidad económica para enfrentar cualquier
                      eventualidad
                    </b>
                    <span>{item.professionDescription}</span>
                    <b>¿Tiene niños menores de 5 años en casa?</b>
                    <p>{item.hasKids ? 'Si' : 'No'}</p>
                    {item.hasKids && (
                      <>
                        <b>
                          Describa la responsabilidad que tiene con los niños en
                          casa. Es fundamental la responsabilidad, la paciencia
                          y la supervisión. Si cumple con estas características,
                          descríbalas detalladamente.
                        </b>
                        <span>{item.responsabilityKids}</span>
                      </>
                    )}
                    <b>Describa a los animales que tiene en casa.</b>
                    <span>{item.descriptionPets}</span>

                    <b>
                      ¿Cómo mantiene a sus mascotas en casa? (alimentación,
                      espacio, atención veterinaria)
                    </b>
                    <span>{item.contextPets}</span>
                    <b>
                      ¿Cuenta con el tiempo y la paciencia necesarios para
                      cuidar a esta mascota?"
                    </b>
                    <span>{item.hasPatienceAndTime ? 'Si' : 'No'}</span>
                    <b>
                      ¿Se compromete a esterilizar al animal adoptado? (en caso
                      de no estar esterilizado)"
                    </b>
                    <span>{item.hasSterilizationCommitment ? 'Si' : 'No'}</span>
                    <b>
                      Describa el lugar donde vivirá la mascota (casa,
                      departamento, patio, etc.)
                    </b>
                    <span>{item.descriptionSpaceForNewPet}</span>
                  </AccordionContent>
                </AccordionItem>
              ))
            ) : (
              <span>Vacio</span>
            )}
          </Accordion>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
