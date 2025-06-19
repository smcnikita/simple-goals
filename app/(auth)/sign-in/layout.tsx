import { Toaster } from '@/components/ui/sonner';
import { CircleCheck, CircleX } from 'lucide-react';

type Props = Readonly<{
  children: React.ReactNode;
}>;

const Layout = async ({ children }: Props) => {
  return (
    <>
      <Toaster
        icons={{
          success: <CircleCheck size={16} className="text-green-700" />,
          error: <CircleX size={16} className="text-red-500" />,
        }}
      />
      {children}
    </>
  );
};

export default Layout;
