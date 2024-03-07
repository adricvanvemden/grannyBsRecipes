import React from 'react';

interface AuthorProps {
  name: string;
}

const Author: React.FC<AuthorProps> = ({ name }) => {
  return <p className="text-xs bg-gray-200 p-2 w-fit font-bold rounded-md">Author: {name}</p>;
};

export default Author;
