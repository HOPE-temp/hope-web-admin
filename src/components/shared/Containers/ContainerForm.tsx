import { cn } from '@/lib/utils';

interface ContainerFormProps {}

export const ContainerForm: React.FC<
  React.PropsWithChildren<ContainerFormProps>
> = ({ children }) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 gap-4',
        'max-h-[60vh] overflow-y-scroll sm:overflow-auto',
        'p-1'
      )}
    >
      {children}
    </div>
  );
};
