export const ContainerHeader: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4  justify-between items-center">
      {children}
    </div>
  );
};
