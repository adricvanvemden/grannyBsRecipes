import { ChevronDown } from 'lucide-react';
import React, { ElementType, PropsWithChildren } from 'react';

interface AccordionProps extends PropsWithChildren {
  id: string;
  title: string;
  titleElement?: ElementType;
  titleClassName?: string;
  className?: string;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  id,
  className,
  titleElement: TitleElement = 'span',
  titleClassName,
  children,
}) => {
  return (
    <details id={id} className={className} open>
      <summary className="cursor-pointer text-lg font-semibold inline-flex items-center gap-4">
        <TitleElement className={titleClassName}>{title}</TitleElement>
        <ChevronDown />
      </summary>
      <div className="mt-2">{children}</div>
    </details>
  );
};

export default Accordion;
