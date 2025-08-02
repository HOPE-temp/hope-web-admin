'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  useController,
} from 'react-hook-form';

import { Badge } from '@/components/ui/badge';

import { CheckboxItem } from '.';

export interface DynamicCheckboxListProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  items: CheckboxItem[];
  title?: string;
  columns?: 1 | 2 | 3 | 4;
}

interface CheckboxCardProps {
  item: CheckboxItem;
  selected: boolean;
  onClick: (id: number) => void;
}

export function CheckboxCard({ item, selected, onClick }: CheckboxCardProps) {
  const { id, image, name, description } = item;
  return (
    <Card
      key={id}
      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
        selected ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-muted/50'
      }`}
      onClick={() => onClick(id)}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-4 mb-2">
              {image && (
                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <Image
                    src={image || '/placeholder.svg'}
                    alt={name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
              )}

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

export function DynamicCheckboxList<T extends FieldValues>({
  control,
  name,
  items,
  title = 'Selecciona elementos',
  columns = 3,
}: DynamicCheckboxListProps<T>) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  const [selectedItems, setSelectedItems] = useState<CheckboxItem[]>([]);
  const [noSelectedItems, setNoSelectedItems] = useState<CheckboxItem[]>([]);

  const {
    field: { value = [] as number[], onChange },
  } = useController({ name, control });

  const handleCheckboxChange = (checkedValue: number) => {
    let filterSelected: CheckboxItem[];
    if (value.includes(checkedValue)) {
      const newList = value.filter((v: number) => v !== checkedValue);
      onChange(newList);
      filterSelected = selectedItems.filter(({ id }) => id != checkedValue);
      setSelectedItems(filterSelected);
    } else {
      // Añadir valor al array
      onChange([...value, checkedValue]);

      const filterSearch = items.find(item => item.id == checkedValue);
      if (filterSearch) {
        filterSelected = [...selectedItems, filterSearch];
        setSelectedItems(filterSelected);
      }
    }
    const notSelected = items.filter(
      ({ id }) => !filterSelected.some(filter => filter.id === id)
    );
    setNoSelectedItems(notSelected);
  };

  useEffect(() => {
    if (items.length > 0) {
      if (value.length > 0) {
        const selectedValue = selectedItems.map(({ id }) => id);
        const selected = items.filter(
          ({ id }) => value.includes(id) && !selectedValue.includes(id)
        );
        const notSelected = items.filter(({ id }) => !value.includes(id));

        setSelectedItems([...selectedItems, ...selected]);
        setNoSelectedItems(notSelected);
      } else {
        setNoSelectedItems(items);
      }
    }
  }, [items]);
  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
      </div>
      <Controller
        control={control}
        name={name}
        render={() => {
          return (
            <div>
              <div className={`grid gap-4 ${gridCols[columns]}`}>
                {selectedItems.map(item => (
                  <CheckboxCard
                    key={item.id}
                    selected={true}
                    item={item}
                    onClick={handleCheckboxChange}
                  />
                ))}
                {noSelectedItems.map(item => (
                  <CheckboxCard
                    key={item.id}
                    selected={false}
                    item={item}
                    onClick={handleCheckboxChange}
                  />
                ))}
              </div>
              {value.length > 0 && (
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold mb-2">
                    Elementos seleccionados:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {value.map(id => {
                      const item = selectedItems.find(item => item.id === id);
                      return item ? (
                        <Badge
                          key={id}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          <div className="w-4 h-4 rounded overflow-hidden">
                            <Image
                              src={item.image || '/placeholder.svg'}
                              alt={item.name}
                              width={16}
                              height={16}
                              className="object-cover"
                            />
                          </div>
                          {item.name}
                        </Badge>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        }}
      />
    </div>
  );
}
