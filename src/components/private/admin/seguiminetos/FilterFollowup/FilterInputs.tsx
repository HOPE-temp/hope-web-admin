'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

//schema
import { FormValues, schema } from './schema';

//components
import { Form } from '@/components/ui/form';
import {
  FormInputCustom,
  FormSelectCustom,
} from '@/components/shared/Input/InputCustom';
import { Button } from '@/components/ui/button';
import { SearchCheckIcon, TimerResetIcon } from 'lucide-react';

type FilterInputFollowupProps = {
  onGetData: (data: FormValues) => void;
  defaultFilter: { id?: string };
};

const defaultValues = {
  id: undefined,
  statusFolloup: undefined,
  activitiesFinished: undefined,
};

export function FilterInputFollowup({
  onGetData,
  defaultFilter: { id },
}: FilterInputFollowupProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  React.useEffect(() => {
    if (id) {
      form.reset({ ...defaultValues, id });
      onGetData({ id });
    }
  }, [id]);

  const idValue = form.watch('id');
  const statusFolloup = form.watch('statusFolloup');

  const onSubmit = async (data: FormValues) => {
    onGetData(data);
  };

  const handleClickReset = () => {
    form.reset(defaultValues); // Resetea el formulario
    onGetData(defaultValues); // Limpia filtros en el componente padre
  };

  React.useEffect(() => {
    form.handleSubmit(onSubmit)();
  }, [idValue, statusFolloup]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
          <FormInputCustom
            control={form.control}
            name="id"
            label="Id seguimiento"
            debounceMs={400}
          />
          <FormSelectCustom
            control={form.control}
            name="statusFolloup"
            label="Solicitud de adopción en seguimiento"
            options={[
              { label: 'Agendado', value: 'scheduled_followup' },
              { label: 'Verificado', value: 'verified' },
              {
                label: 'Esterilizacion agendado',
                value: 'scheduled_sterilization',
              },
              { label: 'Cancelado', value: 'cancelled' },
            ]}
          />

          <div className="flex justify-around content-end mt-auto mb-0 ">
            <Button type="button" onClick={handleClickReset}>
              <TimerResetIcon />
              Resetear
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
