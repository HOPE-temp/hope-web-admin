import React from 'react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';

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

interface FormInputCustomProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  max?: string | number;
}

export function FormInputCustom<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = 'text',
  max,
}: FormInputCustomProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} placeholder={placeholder} type={type} max={max} />
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
            <input
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
