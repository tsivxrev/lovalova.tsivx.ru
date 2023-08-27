'use client';

import { logout } from '@/actions/user';
import { Heart, ScanFace } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from './theme/Toggle';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
  DropdownMenu, DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useUser } from './user/UserProvider';

export default function Navbar({ title }: { title: string }) {
  const user = useUser();

  async function onLogout() {
    await logout();
  }

  return (
    <div className="navbar flex items-center justify-between gap-4 pb-2 rounded-lg">
      <div className="navbar-brand font-medium text-lg flex gap-2 items-center">
        <Heart className='text-primary' />
        <div className="title">{title}</div>
      </div>

      <div className="navbar-actions flex gap-2 items-center">
        <ThemeToggle />

        {user
          ? (
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Avatar className='h-9 w-9 border-2 border-primary'>
                  <AvatarImage src={user.avatar} />
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href="/user/me">
                <DropdownMenuItem>Перейти в профиль</DropdownMenuItem>
              </Link>

              <Link href="/relationship">
                <DropdownMenuItem>Мои отношения</DropdownMenuItem>
              </Link>

              <DropdownMenuItem onClick={() => { onLogout(); }}>Выйти из аккаунта</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          )
          : (
            <Link href="/auth">
              <Button variant='ghost' size='icon'>
                <ScanFace className="h-5 w-5" />
              </Button>
            </Link>
          )
        }
      </div>
    </div>
  );
}
