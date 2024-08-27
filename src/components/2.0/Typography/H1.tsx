import { FC, PropsWithChildren } from 'react';
import { fluidTypography } from './helper';

interface H1Props extends PropsWithChildren {
  id: string;
  className?: string;
}

const H1: FC<H1Props> = ({ children, className, id }) => {
  return (
    <h1 id={id} className={className} style={{ fontSize: fluidTypography(24, 48, 320, 1200) }}>
      {children}
    </h1>
  );
};

export default H1;
