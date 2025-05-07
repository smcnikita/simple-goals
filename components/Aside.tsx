'use client';

import { useMemo, type FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import type { Years } from '@/types/years.types';

type Props = {
  years: Years;
};

const Aside: FC<Props> = ({ years }) => {
  const pathname = usePathname();

  const yearsLinks = useMemo(() => {
    return years.map((year) => ({
      title: year,
      url: `/goals/${year}`,
    }));
  }, [years]);

  const selectedYear = useMemo(() => {
    const segments = pathname.split('/');
    return Number(segments[2]);
  }, [pathname]);

  return (
    <Sidebar className="left-auto">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Years</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {yearsLinks.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={selectedYear === Number(item.title)}>
                    <Link href={item.url}>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default Aside;
