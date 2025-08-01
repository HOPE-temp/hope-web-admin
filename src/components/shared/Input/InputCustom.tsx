import React from 'react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';

import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

interface FormInputCustomProps<T extends FieldValues>
  extends React.ComponentProps<'input'> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
}

export function FormInputCustom<T extends FieldValues>({
  control,
  name,
  label,
  type = 'text',
  ...props
}: FormInputCustomProps<T>): JSX.Element {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const inputProps = {
          ...field,
          ...(type === 'number'
            ? {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  const val = e.target.value;
                  field.onChange(val === '' ? undefined : +val); // convierte a number
                },
                value: field.value ?? '', // evita que sea undefined
              }
            : {}),
        };

        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input {...inputProps} type={type} {...props} />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

interface FormTextareaCustomProps<T extends FieldValues>
  extends React.ComponentProps<'textarea'> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
}

export function FormTextareaCustom<T extends FieldValues>({
  control,
  name,
  label,
  ...props
}: FormTextareaCustomProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea {...field} {...props} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

type Option = {
  label: string;
  value: string;
};

type FormSelectCustomProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  options: Option[];
  placeholder?: string;
};

export function FormSelectCustom<T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder = 'Seleccionar',
}: FormSelectCustomProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select
              value={field.value}
              onValueChange={field.onChange}
              key={field.value ?? 'empty'}
              defaultValue={field.value}
            >
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

type FormCheckboxCutomProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  description?: string;
};

export function FormCheckboxCustom<T extends FieldValues>({
  control,
  name,
  label,
  description,
}: FormCheckboxCutomProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col space-y-1">
          <FormControl>
            <div className="flex items-start gap-3">
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                id={name}
              />
              <div className="grid gap-1.5 font-normal">
                <FormLabel htmlFor={name}>{label}</FormLabel>
                {description && (
                  <p className="text-muted-foreground text-sm">{description}</p>
                )}
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

type FormFileInputCustomProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  accept?: string;
};

export function FormFileInputCustom<T extends FieldValues>({
  control,
  name,
  label,
  accept = 'image/*',
}: FormFileInputCustomProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type="file"
              accept={accept}
              onChange={e => {
                const fileList = e.target.files;
                if (fileList && fileList.length > 0) {
                  field.onChange(fileList);
                }
              }}
              className="w-full rounded-md border px-3 py-2 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-gray-800 file:px-4 file:py-2 file:text-white hover:file:bg-gray-700"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

import { useState } from 'react';

type FormSelectSearchableCustomProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  description?: string;
  options: string[]; // lista simple de opciones (puede adaptarse a tipo más complejo)
};

export function FormSelectSearchableCustom<T extends FieldValues>({
  control,
  name,
  label,
  description,
  options,
}: FormSelectSearchableCustomProps<T>) {
  const [focusedInput, setFocusedInput] = useState<boolean>(false);
  const [focusedNodo, setFocusedNodo] = useState<boolean>(false);
  const isFocused = focusedInput || focusedNodo;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const [query, setQuery] = useState(field.value ?? '');

        const filteredOptions = query
          ? options.filter(option =>
              option.toLowerCase().includes(query.toLowerCase())
            )
          : options;

        const onSelect = (value: string) => {
          setQuery(value);
          field.onChange(value);
        };

        const onChangeInput = (value: string) => {
          setQuery(value);
          field.onChange(value);
        };

        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl className={`h-auto ${focusedInput ?? 'bg-black'}`}>
              <Command>
                <CommandInput
                  placeholder={`Busca o escribe para seleccionar...`}
                  value={query}
                  onValueChange={onChangeInput}
                  aria-label={label}
                  onFocus={() => setFocusedInput(true)}
                  onBlur={() => setFocusedInput(false)}
                />
                <CommandList
                  className={`max-h-[8rem] ${isFocused ? '' : ' h-[0rem]'}`}
                  tabIndex={0}
                  onFocus={() => setFocusedNodo(true)}
                  onBlur={() => setFocusedNodo(false)}
                >
                  {filteredOptions.length === 0 && (
                    <CommandEmpty>No se encontró ninguna opción.</CommandEmpty>
                  )}
                  <CommandGroup>
                    {filteredOptions.map(option => (
                      <CommandItem
                        key={option}
                        onSelect={() => onSelect(option)}
                      >
                        {option}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </FormControl>
            {description && (
              <p className="text-muted-foreground text-sm">{description}</p>
            )}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
