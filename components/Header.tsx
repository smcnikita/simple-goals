import type { FC } from 'react';
import { User2, LogOut } from 'lucide-react';
import Link from 'next/link';

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
          <DropdownMenuLabel>example@example.com</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut />
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
