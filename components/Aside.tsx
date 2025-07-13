'use client';

import { useEffect, useMemo, type FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { PATHS } from '@/constants/paths';

import { useUserYearsStore } from '@/stores/user-years-store';

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

import type { YearModel } from '@/types/years/year';

type Props = {
  years: YearModel[];
};

const Aside: FC<Props> = ({ years }) => {
  const pathname = usePathname();
  const t = useTranslations('aside');

  const { updateUserYears, userYears } = useUserYearsStore();

  const yearsLinks = useMemo(() => {
    return userYears.map((year) => ({
      title: year,
      url: PATHS.goals.base + PATHS.goals.slugYear.replace(':year', year.toString()),
    }));
  }, [userYears]);

  const selectedYear = useMemo(() => {
    const segments = pathname.split('/');
    return Number(segments[2]);
  }, [pathname]);

  useEffect(() => {
    updateUserYears(years.map((year) => year.year));
  }, [updateUserYears, years]);

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
