import { cn } from '@/lib/utils';

const InstructionsList: React.FC<InstructionSet & { index: number }> = ({ instructions, title, index }) => (
  <div className={cn(index > 0 ? 'my-8' : 'mb-8')}>
    <strong>{title}</strong>
    <ol className="not-prose">
      {instructions.map((instruction, index) => (
        <li className="text-black flex my-4 gap-2" key={index}>
          <div className="bg-orange-500 rounded-full max-h-6 max-w-6 w-full text-center text-white text-sm pt-0.5">
            {index + 1}
          </div>
          <span className="-mt-[3px]">{instruction.instruction}</span>
        </li>
      ))}
    </ol>
  </div>
);

export default InstructionsList;
