'use client';

import { useEffect, useState } from 'react';
import { NavigationItems } from './NavigationItems';
import { cn } from '@/lib/utils/utils';
import { Link } from './index';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Profile from './Profile';

const MobileMenu: React.FC<{ links: Link[]; isLoggedIn?: boolean }> = ({ links, isLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  function handleOnClick() {
    setIsOpen((prev) => {
      if (!prev) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
      return !prev;
    });
  }

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // if route change close the menu
  useEffect(() => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  }, [pathname]);

  return (
    <>
      <button className="absolute right-0 flex w-24 items-center justify-center lg:hidden" onClick={handleOnClick}>
        {isOpen ? (
          <X className="h-6 w-6 text-primary-foreground" />
        ) : (
          <Menu className="h-6 w-6 text-primary-foreground" />
        )}
      </button>

      <div
        className={cn(
          'absolute inset-0 top-16 z-50 flex h-screen flex-col gap-4 bg-secondary px-5 transition-opacity duration-200 lg:hidden',
          isOpen ? 'opacity-100' : 'opacity-0 -z-50'
        )}
      >
        <button className="mr-2 mt-3 self-end" onClick={handleOnClick}></button>
        <NavigationItems links={links} classNames="h-fit" orientation="vertical" />
        {isLoggedIn && <Profile onClick={handleOnClick} />}
      </div>
    </>
  );
};

export default MobileMenu;
