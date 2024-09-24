'use client';
import { ChevronDown } from 'lucide-react';
import { PropsWithChildren, FC, useRef, useState, useEffect } from 'react';
import H2 from './Typography/H2';
import { cn } from '@/lib/utils/utils';

interface AccordionProps extends PropsWithChildren {
  id: string;
  title: string;
  titleElement?: 'h2' | 'span';
  titleClassName?: string;
  className?: string;
  open?: boolean;
  onClick?: () => void;
}

const Accordion: FC<AccordionProps> = ({
  title,
  id,
  className,
  titleElement = 'span',
  titleClassName,
  children,
  open = true,
  onClick,
}) => {
  const TitleElement = titleElement === 'h2' ? H2 : 'span';

  return (
    <details id={id} className={className} open={open} onClick={onClick}>
      <summary className="cursor-pointer text-lg font-semibold inline-flex items-center gap-4">
        <TitleElement id={`${id}-title`} className={titleClassName}>
          {title}
        </TitleElement>
        <ChevronDown />
      </summary>

      <div className="mt-2">
        <div>{children}</div>
      </div>
    </details>
  );
};

Accordion.displayName = 'Accordion';

export default Accordion;
