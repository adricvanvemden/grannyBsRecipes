import MobileMenu from './MobileMenu';
import Logo from './Logo';
import { NavigationItems } from './NavigationItems';
import { createClient } from '@/lib/utils/supabase/server';
import SignOutButton from './signOutButton';

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

const linksLeft: Link[] = [
  {
    url: '/recipe',
    title: 'Recipes',
    external: false,
    target: '_self',
    subItems: null,
  },
];

const Navigation = async () => {
  let linksRight: Link[] = [
    {
      url: '/account',
      title: 'Account',
      external: false,
      target: '_self',
      subItems: null,
    },
  ];
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  const isLoggedIn = !!data?.user;

  if (isLoggedIn) {
    linksRight = [
      {
        url: '/recipe/create',
        title: 'New Recipe',
        external: false,
        target: '_self',
        subItems: null,
      },
      {
        url: '/account',
        title: 'Account',
        external: false,
        target: '_self',
        subItems: null,
      },
    ];
  }

  return (
    <div className="h-16 bg-primary flex">
      <nav className="gap-4 container flex items-center">
        <Logo />
        <div className="hidden lg:flex w-full  justify-between">
          <NavigationItems links={linksLeft} classNames="hidden lg:flex" />
          <div className="flex gap-4 divide-x-2">
            <NavigationItems links={linksRight} classNames="hidden lg:flex" />
            {isLoggedIn && <SignOutButton />}
          </div>
        </div>
        <MobileMenu links={[...linksLeft, ...linksRight]} isLoggedIn={isLoggedIn} />
      </nav>
    </div>
  );
};

export default Navigation;
