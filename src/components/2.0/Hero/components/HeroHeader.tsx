import { FC, PropsWithChildren } from 'react';
import Container from '../../Container';

const HeroHeader: FC<PropsWithChildren> = ({ children }) => {
  return <Container id="hero-header">{children}</Container>;
};

export default HeroHeader;
