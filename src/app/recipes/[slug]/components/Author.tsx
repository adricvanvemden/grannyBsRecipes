import React from 'react';

interface AuthorProps {
  name: string;
}

const Author: React.FC<AuthorProps> = ({ name }) => {
  return <p className="mx-auto my-0 text-xs w-fit font-bold rounded-md flex gap-1 items-center">By: {name}</p>;
};

export default Author;
