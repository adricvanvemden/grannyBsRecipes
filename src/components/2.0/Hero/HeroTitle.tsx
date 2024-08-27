import { FC } from 'react';
import { HeroProps } from './Hero';
import H1 from '../Typography/H1';

interface HeroTitleProps extends Pick<HeroProps, 'title'> {}

const HeroTitle: FC<HeroTitleProps> = ({ title }) => {
  return (
    <H1 id="hero-title" className="text-primary m-0 mb-4">
      {title}
    </H1>
  );
};

export default HeroTitle;
