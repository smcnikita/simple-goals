'use client';

import type { FC } from 'react';
import { User2, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const Header: FC = () => {
  const { data: session } = useSession();

  return (
    <header className="py-4 px-3 flex items-center justify-between gap-1">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <Link href="/" className="font-semibold">
          Simple Goals
        </Link>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <User2 />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel asChild>
            <div className="grid flex-1 text-left text-sm">
              <span className="font-semibold">{session?.user?.name}</span>
              <span className="text-xs text-gray-500">{session?.user?.email}</span>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={async () => await signOut()}>
            <LogOut />
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
