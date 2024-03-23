import MobileMenu from './MobileMenu';
import Logo from './Logo';
import { NavigationItems } from './NavigationItems';

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

const linksRight: Link[] = [
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

const Navigation = () => {
  return (
    <div className="h-16 bg-primary flex">
      <nav className="gap-4 container flex items-center">
        <Logo />
        <div className="w-full flex justify-between">
          <NavigationItems links={linksLeft} classNames="hidden lg:flex" />
          <NavigationItems links={linksRight} classNames="hidden lg:flex" />
        </div>
        <MobileMenu links={[...linksLeft, ...linksRight]} />
      </nav>
    </div>
  );
};

export default Navigation;
