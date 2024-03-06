interface Instruction {
  instruction: string;
}

interface InstructionsListProps {
  instructions: Instruction[];
}

const InstructionsList: React.FC<InstructionsListProps> = ({ instructions }) => (
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
);

export default InstructionsList;
