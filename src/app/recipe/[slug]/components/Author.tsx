import React from 'react';
import { Pencil } from 'lucide-react';

interface AuthorProps {
  name: string;
}

const Author: React.FC<AuthorProps> = ({ name }) => {
  return (
    <p className="text-xs bg-gray-200 p-2 w-fit font-bold rounded-md flex gap-1 items-center">
      <Pencil size={16} /> {name}
    </p>
  );
};

export default Author;
