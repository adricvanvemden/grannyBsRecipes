import { FC, PropsWithChildren } from 'react';
import Container from '../../Container';

const HeroBody: FC<PropsWithChildren> = ({ children }) => {
  return <Container id="hero-body">{children}</Container>;
};

export default HeroBody;
