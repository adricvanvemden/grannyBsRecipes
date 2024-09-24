import React from 'react';
import Accordion from '../Accordion';
import InstructionsListItem from './InstructionsListItem';
import { InstructionList } from '@/types';
import Container from '../Container';

interface InstructionsListSectionProps extends InstructionList {
  index: number;
}

const InstructionsListSection: React.FC<InstructionsListSectionProps> = ({ name, instructions, index }) => {
  const key = `instructions-section-${index}`;
  return (
    <Accordion id={key} title={name} key={key} className="flex items-center justify-between py-2 ml-2">
      <Container className="gap-2 inline-flex flex-col">
        {instructions.map((instruction, index) => (
          <InstructionsListItem {...instruction} index={++index} key={index} />
        ))}
      </Container>
    </Accordion>
  );
};

export default InstructionsListSection;
