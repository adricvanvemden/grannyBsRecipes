import React from 'react';
import IngredientListItem from './InstructionsListItem';
import Accordion from '../Accordion';
import InstructionsListItem from './InstructionsListItem';
import { InstructionList } from '@/types';

interface InstructionsListSectionProps extends InstructionList {
  index: number;
}

const InstructionsListSection: React.FC<InstructionsListSectionProps> = ({ name, instructions, index }) => {
  const key = `instructions-section-${index}`;
  return (
    <Accordion id={key} title={name} key={key} className="flex items-center justify-between py-2 ml-2">
      <div className="gap-2 inline-flex flex-col">
        {instructions.map((instruction, index) => (
          <InstructionsListItem {...instruction} index={++index} key={index} />
        ))}
      </div>
    </Accordion>
  );
};

export default InstructionsListSection;
