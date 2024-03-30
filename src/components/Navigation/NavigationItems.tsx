'use client';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils/utils';
import { Link } from './index';

export const NavigationItems: React.FC<{
  links: Link[];
  classNames?: string;
  orientation?: 'horizontal' | 'vertical';
}> = ({ links, classNames, orientation }) => {
  const pathname = usePathname();

  return (
    <NavigationMenu className={classNames} orientation="vertical">
      <NavigationMenuList className={cn(orientation === 'vertical' ? 'flex-col' : 'flex-row')}>
        {links.map((link) => {
          const { title, url, subItems } = link;
          return (
            <Fragment key={title}>
              {subItems ? (
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="hover:text-primary-foreground/70 focus:text-primary-foreground/70">
                    {title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="whitespace-nowrap">
                      {subItems.map((subItem, index) => (
                        <NavigationMenuLink key={`${orientation}-${index}`} {...subItem} href={subItem.url} isSubItem />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    {...link}
                    href={url}
                    isActive={link.url === pathname}
                  />
                </NavigationMenuItem>
              )}
            </Fragment>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
