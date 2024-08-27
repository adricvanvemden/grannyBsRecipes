import { FC, PropsWithChildren } from 'react';
import { fluidTypography } from './helper';

interface H2Props extends PropsWithChildren {
  id: string;
  className?: string;
}

const H2: FC<H2Props> = ({ children, className, id }) => {
  return (
    <h2 id={id} className={className} style={{ fontSize: fluidTypography(24, 36, 320, 1200) }}>
      {children}
    </h2>
  );
};

export default H2;
