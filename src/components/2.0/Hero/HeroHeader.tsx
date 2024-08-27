import { FC, PropsWithChildren } from 'react';

const HeroHeader: FC<PropsWithChildren> = ({ children }) => {
  return <div id="hero-header">{children}</div>;
};

export default HeroHeader;
