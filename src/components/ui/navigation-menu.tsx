import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { cva } from 'class-variance-authority';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils/utils';
import Link from 'next/link';

const NavigationMenu = forwardRef<
  ElementRef<typeof NavigationMenuPrimitive.Root>,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      'relative z-10 flex max-w-max data-[orientation=horizontal]:flex-1 data-[orientation=horizontal]:items-center data-[orientation=horizontal]:justify-center',
      className
    )}
    {...props}
  >
    {children}
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = forwardRef<
  ElementRef<typeof NavigationMenuPrimitive.List>,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      'group flex flex-1 list-none justify-center gap-x-4 data-[orientation=horizontal]:items-center xl:gap-x-6',
      className
    )}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = forwardRef<
  ElementRef<typeof NavigationMenuPrimitive.Item>,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Item>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Item ref={ref} className={cn('relative', className)} {...props} />
));
NavigationMenuItem.displayName = 'NavigationMenuItem';

const navigationMenuTriggerStyle = cva(
  'group inline-flex h-10 w-max items-center justify-cente py-2 text-primary-foreground hover:text-primary-foreground/70 font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 uppercase'
);

const NavigationMenuTrigger = forwardRef<
  ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger ref={ref} className={cn(navigationMenuTriggerStyle(), className)} {...props}>
    {children}
    <ChevronDown
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = forwardRef<
  ElementRef<typeof NavigationMenuPrimitive.Content>,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      'relative left-0 top-0 z-10 w-full rounded-b bg-primary pl-2 lg:absolute lg:mt-12 lg:shadow-md',
      className
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

interface NavigationMenuLinkProps extends ComponentPropsWithoutRef<'a'> {
  title: string;
  isSubItem?: boolean;
  target: string;
  external?: boolean;
  isActive?: boolean;
}

const NavigationMenuLink = forwardRef<ElementRef<'a'>, NavigationMenuLinkProps>(
  ({ href, external, target, isSubItem, isActive, className, ...props }, ref) => {
    if (!href) return null;

    const link = (
      <>
        {external ? (
          <NavigationMenuPrimitive.Link asChild>
            <a
              ref={ref}
              href={href}
              target={target}
              rel={external ? 'noopener noreferrer' : ''}
              className={cn(
                'block select-none p-3 leading-none text-primary-foreground no-underline transition-colors hover:text-primary-foreground/70',
                className
              )}
              {...props}
            >
              {props.title}
            </a>
          </NavigationMenuPrimitive.Link>
        ) : (
          <Link ref={ref} href={href} legacyBehavior passHref>
            <NavigationMenuPrimitive.Link
              className={cn(
                navigationMenuTriggerStyle(),
                isActive
                  ? 'mt-0.5 border-b-4 border-primary-foreground border-x-transparent text-primary-foreground'
                  : 'text-primary-foreground hover:text-primary-foreground/70 focus:text-primary-foreground/70'
              )}
              target={target}
            >
              {props.title}
            </NavigationMenuPrimitive.Link>
          </Link>
        )}
      </>
    );

    return isSubItem ? <li>{link}</li> : link;
  }
);
NavigationMenuLink.displayName = NavigationMenuPrimitive.Link.displayName;

const NavigationMenuIndicator = forwardRef<
  ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      'data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden',
      className
    )}
    {...props}
  >
    <div className="bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md" />
  </NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName = NavigationMenuPrimitive.Indicator.displayName;

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
};
