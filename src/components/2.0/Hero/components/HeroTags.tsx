import { FC } from 'react';
import { HeroProps } from '../Hero';
import Container from '../../Container';

interface HeroTagsProps extends Pick<HeroProps, 'tags'> {}
const HeroTags: FC<HeroTagsProps> = ({ tags }) => {
  return (
    <Container id="hero-tags">
      {tags.map((tag) => (
        <span
          key={tag}
          className="bg-gray-300 text-gray-800 text-xs font-semibold py-1 px-2 rounded-full inline-block mr-2 mb-2"
        >
          {tag}
        </span>
      ))}
    </Container>
  );
};

export default HeroTags;
