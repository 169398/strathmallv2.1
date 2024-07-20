import Logo from '../Core/Logo';

export const PaymentLayout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <div className="bg-blue-50 min-h-screen">
      <Logo />
      <div className=" flex mt-0 lg:mt-16 max-w-[1166px] mx-auto">{children}</div>
    </div>
  );
};
