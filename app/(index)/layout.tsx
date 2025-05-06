import Aside from '@/components/Aside';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/Header';
import Content from '@/components/Content';

type Props = Readonly<{
  children: React.ReactNode;
}>;

const Layout = async ({ children }: Props) => {
  return (
    <div className="max-w-[1000px] mx-auto px-3">
      <SidebarProvider>
        <Aside />
        <Content>
          <Header />
          <Separator />
          <main className="py-4 px-3">{children}</main>
        </Content>
      </SidebarProvider>
    </div>
  );
};

export default Layout;
