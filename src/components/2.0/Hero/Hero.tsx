import { FC } from 'react';
import HeroBody from './components/HeroBody';
import HeroDescription from './components/HeroDescription';
import HeroHeader from './components/HeroHeader';
import HeroTags from './components/HeroTags';
import HeroTitle from './components/HeroTitle';
import { BackButton } from '@/components/BackButton';
import HeroDivider from './components/HeroDivider';
import Container from '../Container';
import { RecipeData } from '@/types';

export interface HeroProps {
  title: string;
  description: string;
  tags: RecipeData['tags'];
}
export const Hero: FC<HeroProps> = (props) => {
  return (
    <Container className="bg-black rounded-lg text-gray p-6 max-w-[890px] mx-auto drop-shadow-lg">
      <HeroHeader>
        <BackButton />
      </HeroHeader>
      <HeroDivider />
      <HeroBody>
        <HeroTitle {...props} />
        <HeroDescription {...props} />
        {/* <HeroTags {...props} /> */}
      </HeroBody>
    </Container>
  );
};
