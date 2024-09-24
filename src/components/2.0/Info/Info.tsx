'use client';

import { Beef, ChefHat, Cookie, CookingPot, Croissant, Droplet, Flame, Zap } from 'lucide-react';
import InfoItem from './InfoItem';
import Accordion from '../Accordion';
import { Nutrient } from '@/types';
import { FC, useRef, useState } from 'react';
import Container from '../Container';

interface InfoProps {
  prepTime: string | undefined; // Represented as HH:MM:SS
  cookTime: string | undefined;
  serves: number | undefined;
  nutrients: Nutrient;
}

const formatTime = (time: string | undefined): string => {
  if (!time) return 'N/A';
  const [hours, minutes, seconds] = time.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes + Math.round(seconds / 60);
  return `${totalMinutes} min`;
};

const Info: FC<InfoProps> = ({ prepTime, cookTime, serves, nutrients }) => {
  const { calories, carbohydrates, fat, protein } = nutrients;

  return (
    <Container className="not-prose flex-col bg-black rounded py-4 px-6 text-gray text-center w-fit">
      <Container className="flex flex-row gap-8 mb-4 flex-wrap">
        <InfoItem
          className="w-24 whitespace-nowrap"
          icon={<ChefHat size={16} className="shrink-0" />}
          label="Prep Time"
          value={formatTime(prepTime)}
        />
        <InfoItem
          className="w-24 whitespace-nowrap"
          icon={<CookingPot size={16} className="shrink-0" />}
          label="Cook Time"
          value={formatTime(cookTime)}
        />
        <InfoItem
          className="w-24 whitespace-nowrap"
          icon={<Cookie size={16} className="shrink-0" />}
          label="Serves"
          value={serves ?? 'N/A'}
        />
      </Container>
      <Accordion
        id="nutrients-list"
        title="Nutrients"
        titleClassName="text-gray"
        className="pt-4 bg-black text-gray border-t"
        open={false}
      >
        <Container className="flex flex-row gap-4 mb-4 flex-wrap">
          <InfoItem className="w-24" icon={<Flame size={16} />} label="Calories" value={calories} />
          <InfoItem className="w-24" icon={<Croissant size={16} />} label="Carbs" value={carbohydrates} />
          <InfoItem className="w-24" icon={<Zap size={16} />} label="Protein" value={protein} />
          <InfoItem className="w-24" icon={<Droplet size={16} />} label="Fat" value={fat} />
        </Container>
      </Accordion>
    </Container>
  );
};

export default Info;
