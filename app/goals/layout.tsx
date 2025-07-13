import { getServerSession } from 'next-auth';
import { CircleCheck, CircleX } from 'lucide-react';

import { authOptions } from '@/lib/auth/auth';

import * as yearsController from '@/controllers/years';

import Aside from '@/components/Aside';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Toaster } from '@/components/ui/sonner';

import Header from '@/components/Header';
import Content from '@/components/Content';

type Props = Readonly<{
  children: React.ReactNode;
}>;

const Layout = async ({ children }: Props) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error('Session is not defined. Please ensure that the session is initialized before proceeding.');
  }

  const years = await yearsController.findByUserId(Number(session.user.id));

  return (
    <div className="max-w-[1000px] mx-auto px-3">
      <SidebarProvider>
        <Aside years={years} />
        <Content>
          <Header />
          <Separator />
          <main className="py-4 px-3">{children}</main>
          <Toaster
            icons={{
              success: <CircleCheck size={16} className="text-green-700" />,
              error: <CircleX size={16} className="text-red-500" />,
            }}
          />
        </Content>
      </SidebarProvider>
    </div>
  );
};

export default Layout;
