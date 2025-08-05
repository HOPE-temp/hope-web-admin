export const ContainerPage: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <div className="min-h-screen bg-gray-100 p-2 sm:p-6">
      <div className="rounded-lg bg-white shadow py-6 px-4 sm:p-6">
        {children}
      </div>
    </div>
  );
};
