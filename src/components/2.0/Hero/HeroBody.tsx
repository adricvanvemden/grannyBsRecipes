import { FC, PropsWithChildren } from 'react';

const HeroBody: FC<PropsWithChildren> = ({ children }) => {
  return <div id="hero-body">{children}</div>;
};

export default HeroBody;
