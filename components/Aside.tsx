'use client';

import { useMemo, type FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { PATHS } from '@/constants/paths';

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

import type { YearModel } from '@/types/years.types';

type Props = {
  years: YearModel[];
};

const Aside: FC<Props> = ({ years }) => {
  const pathname = usePathname();
  const t = useTranslations('aside');

  const yearsLinks = useMemo(() => {
    return years.map((year) => ({
      title: year.year,
      url: PATHS.goals.base + PATHS.goals.slugYear.replace(':year', year.year.toString()),
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
          <SidebarGroupLabel>{t('years')}</SidebarGroupLabel>
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
