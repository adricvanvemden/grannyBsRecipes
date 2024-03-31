'use client';
import { cn } from '@/lib//utils/utils';
import { useState } from 'react';

const InstructionsList: React.FC<InstructionSet & { index: number }> = ({ instructions, title, index }) => {
  const [completedInstructions, setCompletedInstructions] = useState<number[]>([]);

  function toggleCompleted(index: number) {
    const newCompletedInstructions = completedInstructions.includes(index)
      ? completedInstructions.filter((i) => i !== index)
      : [...completedInstructions, index];
    setCompletedInstructions(newCompletedInstructions);
  }

  return (
    <div className="bg-secondary/60 px-2 pt-2 pb-px rounded mb-4">
      <h3 className="my-0">{title}</h3>
      <ol className="not-prose">
        {instructions.map((instruction, index) => (
          <li
            className={cn(
              'flex my-4 gap-2 cursor-pointer border-neutral border-b last:border-b-0 pb-2 last:pb-0',
              completedInstructions.includes(index) ? 'text-black/25' : 'text-black'
            )}
            key={index}
            onClick={() => toggleCompleted(index)}
          >
            <div
              className={cn(
                'rounded max-h-6 max-w-6 w-full text-center text-white text-sm pt-px border-2 border-accent',
                completedInstructions.includes(index)
                  ? 'bg-secondary/25 border-secondary/25'
                  : 'bg-secondary border-accent'
              )}
            >
              {index + 1}
            </div>
            <span className="-mt-px ">{instruction.instruction}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default InstructionsList;
