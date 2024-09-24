import MobileMenu from './MobileMenu';
import Logo from './Logo';
import { NavigationItems } from './NavigationItems';
import { createClient } from '@/lib/utils/supabase/server';
import Profile from './Profile';
import Link from 'next/link';
import { PlusIcon } from 'lucide-react';

export type Link = {
  url: string;
  title: string;
  external: boolean;
  target: string;
  subItems:
    | {
        title: string;
        url: string;
        external: boolean;
        target: string;
      }[]
    | null;
};

const links: Link[] = [
  {
    url: '/home',
    title: 'Home',
    external: false,
    target: '_self',
    subItems: null,
  },
  {
    url: '/recipes',
    title: 'Recipes',
    external: false,
    target: '_self',
    subItems: null,
  },
  {
    url: '/videos',
    title: 'Videos',
    external: false,
    target: '_self',
    subItems: null,
  },
  {
    url: '/granny-b',
    title: 'Granny B',
    external: false,
    target: '_self',
    subItems: null,
  },
];

const Navigation = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  const isLoggedIn = !!data?.user;

  return (
    <div className="absolute inset-0 h-16 bg-transparent flex">
      <nav className="gap-4 container flex items-center">
        <Logo />
        <div className="hidden lg:flex w-full justify-end divide-x">
          <NavigationItems links={links} classNames="hidden lg:flex mr-8" />
          {isLoggedIn && (
            <div className="flex pl-8 gap-4">
              <Link
                href="/recipe/new"
                className="inline-flex h-10 py-2 px-4 text-xs items-center justify-center text-primary-foreground hover:text-primary-foreground/70 border rounded-lg"
              >
                New Recipe
                <PlusIcon className="size-3.5 text-primary-foreground ml-2" />
              </Link>
              <Profile />
            </div>
          )}
        </div>
        <MobileMenu links={links} isLoggedIn={isLoggedIn} />
      </nav>
    </div>
  );
};

export default Navigation;
