import { FC } from 'react';
import { HeroProps } from './Hero';

interface HeroDescriptionProps extends Pick<HeroProps, 'description'> {}
const HeroDescription: FC<HeroDescriptionProps> = ({ description }) => {
  return <p id="hero-description">{description}</p>;
};

export default HeroDescription;
