'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import { FormField, FormMessage } from '@/components/ui/form';

export interface InputAdopter extends Partial<Adopter> {}

export interface InputRadioAdopterListProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  items: InputAdopter[];
  title?: string;
  columns?: 1 | 2 | 3 | 4;
}

interface CheckboxCardObjectProps {
  item: InputAdopter;
  selected: boolean;
  onClick: (id: InputAdopter) => void;
}

interface ErrorField {
  message: string;
}

export function CheckboxCardObject({
  item,
  selected,
  onClick,
}: CheckboxCardObjectProps) {
  const { id, evaluations, firstName, lastName, isBanned, documentNumber } =
    item;
  return (
    <Card
      key={id}
      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
        selected ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-muted/50'
      }`}
      onClick={() => onClick(item)}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-4 mb-2">
              <div className="flex-1 ">
                <h3 className="font-semibold text-sm truncate">
                  {firstName} {lastName}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-3">
                  {documentNumber}
                </p>
                {evaluations && (
                  <span>
                    <Badge variant={'default'}>
                      {' '}
                      {evaluations.length} Eval
                    </Badge>
                  </span>
                )}
                {isBanned && <Badge variant={'default'}> Baneado</Badge>}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function InputRadioAdopterList<T extends FieldValues>({
  control,
  name,
  items,
  title = 'Selecciona elementos',
  columns = 3,
}: InputRadioAdopterListProps<T>) {
  const gridCols = {
    1: 'grid-cols-2',
    2: 'grid-cols-2 md:grid-cols-4',
    3: 'grid-cols-2 md:grid-cols-4 lg:grid-cols-5',
    4: 'grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
  };

  const [selectedItem, setSelectedItem] = useState<InputAdopter | undefined>();
  const [noSelectedItems, setNoSelectedItems] = useState<InputAdopter[]>([]);

  useEffect(() => {
    setNoSelectedItems(items.filter(item => item.id !== selectedItem?.id));
  }, [items]);

  return (
    <div className="w-full max-w-6xl mx-auto p-1 sm:p-2 ">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
      </div>
      <FormField
        control={control}
        name={name}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          const handleCheckboxChange = (checkedValue: InputAdopter) => {
            if (!value || value.id != checkedValue.id) {
              onChange(checkedValue);
              setSelectedItem(checkedValue);
              setNoSelectedItems(
                items.filter(item => item.id !== checkedValue.id)
              );
            } else {
              // Añadir valor al array
              onChange(undefined);
              setSelectedItem(undefined);
              setNoSelectedItems(items);
            }
          };

          return (
            <div className="">
              <div
                className={`grid gap-2 sm:gap-4 p-1 sm:p-2 ${gridCols[columns]} max-h-72 overflow-hidden overflow-y-scroll`}
              >
                {selectedItem && (
                  <CheckboxCardObject
                    key={selectedItem.id}
                    selected={true}
                    item={selectedItem}
                    onClick={handleCheckboxChange}
                  />
                )}
                {noSelectedItems.map(item => (
                  <CheckboxCardObject
                    key={item.id}
                    selected={false}
                    item={item}
                    onClick={handleCheckboxChange}
                  />
                ))}
              </div>
              {/* <FormMessage /> */}
              <div className="text-red-500">
                {error?.message && <span>{error?.message}</span>}
                {error &&
                  !error.message &&
                  Object.entries(error).map(([key, value]) => {
                    const { message } = value as ErrorField;
                    return <span>{message}</span>;
                  })}
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}
