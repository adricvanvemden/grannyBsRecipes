'use client';
import { cn } from '@/lib/utils';
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
    <div className={cn(index > 0 ? 'my-8' : 'mb-8')}>
      <strong>{title}</strong>
      <ol className="not-prose">
        {instructions.map((instruction, index) => (
          <li
            className={cn(
              'flex my-4 gap-2 cursor-pointer',
              completedInstructions.includes(index) ? 'text-black/25' : 'text-black'
            )}
            key={index}
            onClick={() => toggleCompleted(index)}
          >
            <div
              className={cn(
                'rounded-full max-h-6 max-w-6 w-full text-center text-white text-sm pt-0.5',
                completedInstructions.includes(index) ? 'bg-orange-500/25' : 'bg-orange-500'
              )}
            >
              {index + 1}
            </div>
            <span className="-mt-px">{instruction.instruction}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default InstructionsList;
