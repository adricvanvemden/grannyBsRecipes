import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { instruction } from '@/types';

interface InstructionsListItemProps extends instruction {
  index: number;
}

const InstructionsListItem: React.FC<InstructionsListItemProps> = ({ instruction, index }) => {
  const key = `instructions-instruction-${index}`;
  return (
    <label id={key} key={key} className="flex gap-2 ml-2 text-gray">
      <Checkbox className="peer hidden" />
      <div className="rounded bg-primary min-w-5 size-5 flex items-center justify-center text-sm font-bold peer-data-[state=checked]:text-gray/30 peer-data-[state=checked]:bg-primary/30">
        {index}
      </div>
      <span className="font-light -mt-1 peer-data-[state=checked]:text-gray/30">
        <span className="font-bold">{instruction} </span>
      </span>
    </label>
  );
};

export default InstructionsListItem;