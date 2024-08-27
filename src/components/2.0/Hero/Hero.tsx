import { FC } from 'react';
import HeroBody from './HeroBody';
import HeroDescription from './HeroDescription';
import HeroHeader from './HeroHeader';
import HeroTags from './HeroTags';
import HeroTitle from './HeroTitle';
import { BackButton } from '@/components/BackButton';
import HeroDivider from './HeroDivider';
import Container from '../Container';
import { RecipeData } from '@/types';

export interface HeroProps {
  title: string;
  description: string;
  tags: RecipeData['tags'];
}
export const Hero: FC<HeroProps> = (props) => {
  return (
    <Container className="bg-black rounded-lg text-gray p-6">
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
