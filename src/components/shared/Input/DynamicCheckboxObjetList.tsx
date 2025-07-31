'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import { CheckboxItem } from '.';
import { FormField, FormMessage } from '@/components/ui/form';

export interface DynamicCheckboxObjetListProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  items: CheckboxItem[];
  title?: string;
  columns?: 1 | 2 | 3 | 4;
}

interface CheckboxCardObjectProps {
  item: CheckboxItem;
  selected: boolean;
  onClick: (id: CheckboxItem) => void;
}

export function CheckboxCardObject({
  item,
  selected,
  onClick,
}: CheckboxCardObjectProps) {
  const { id, image, name, description } = item;
  return (
    <Card
      key={id}
      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
        selected ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-muted/50'
      }`}
      onClick={() => onClick(item)}
    >
      <CardContent className="p-2 sm:p-4">
        <div className="flex items-start gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mb-0 sm:mb-2">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                <Image
                  src={image || '/placeholder.svg'}
                  alt={name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>

              <div className="flex-1 ">
                <h3 className="font-semibold text-sm truncate">{name}</h3>
                {description && (
                  <p className="text-xs text-muted-foreground line-clamp-3">
                    {description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function DynamicCheckboxObjetList<T extends FieldValues>({
  control,
  name,
  items,
  title = 'Selecciona elementos',
  columns = 3,
}: DynamicCheckboxObjetListProps<T>) {
  const gridCols = {
    1: 'grid-cols-2',
    2: 'grid-cols-2 sm:grid-cols-2',
    3: 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  const [selectedItems, setSelectedItems] = useState<CheckboxItem[]>([]);
  const [noSelectedItems, setNoSelectedItems] = useState<CheckboxItem[]>([]);

  useEffect(() => {
    setNoSelectedItems(
      items.filter(item => !selectedItems.some(({ id }) => id === item.id))
    );
  }, [items]);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
      </div>
      <FormField
        control={control}
        name={name}
        render={({
          field: { value = [] as CheckboxItem[], onChange },
          fieldState: { error },
        }) => {
          const handleCheckboxChange = (checkedValue: CheckboxItem) => {
            let valueItems: CheckboxItem[];
            if (value.some(({ id }) => checkedValue.id === id)) {
              valueItems = value.filter(
                (v: CheckboxItem) => v.id !== checkedValue.id
              );
              onChange(valueItems);
              setSelectedItems(valueItems);
            } else {
              // Añadir valor al array
              valueItems = [...value, checkedValue];
              onChange(valueItems);
              setSelectedItems(valueItems);
            }
            setNoSelectedItems(
              items.filter(item => !valueItems.some(({ id }) => id == item.id))
            );
          };

          return (
            <div className="">
              <div
                className={`p-1 grid gap-4 ${gridCols[columns]} max-h-52 lg:max-h-80 overflow-hidden overflow-y-scroll`}
              >
                {selectedItems.map(item => (
                  <CheckboxCardObject
                    key={item.id}
                    selected={true}
                    item={item}
                    onClick={handleCheckboxChange}
                  />
                ))}
                {noSelectedItems.map(item => (
                  <CheckboxCardObject
                    key={item.id}
                    selected={false}
                    item={item}
                    onClick={handleCheckboxChange}
                  />
                ))}
              </div>
              <FormMessage />
            </div>
          );
        }}
      />
    </div>
  );
}
