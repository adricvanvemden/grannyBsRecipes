'use server';
import React from 'react';
import { FC } from 'react';
import Accordion from '../Accordion';
import H2 from '../Typography/H2';
import InstructionsListSection from './InstructionsListSection';
import { RecipeData } from '@/types';

interface InstructionsListProps extends Pick<RecipeData, 'instructions_lists'> {}

const InstructionsListV2: FC<InstructionsListProps> = ({ instructions_lists }) => {
  return (
    <Accordion
      id="ingredients-list"
      title="Instructions"
      titleElement="h2"
      titleClassName="text-primary m-0 inline"
      className="p-4 bg-black text-primary rounded w-full max-w-[800px]"
    >
      {instructions_lists.map((section, index) => (
        <InstructionsListSection {...section} index={++index} key={index} />
      ))}
    </Accordion>
  );
};

export default InstructionsListV2;
