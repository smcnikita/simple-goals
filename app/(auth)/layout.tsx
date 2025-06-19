import Image from 'next/image';

type Props = Readonly<{
  children: React.ReactNode;
}>;

const Layout = async ({ children }: Props) => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <Image src="/icon.svg" width={24} height={24} alt="Logo" />
          Simple Goals
        </a>
        {children}
      </div>
    </div>
  );
};

export default Layout;
