import React from 'react';
import { FC } from 'react';
import Accordion from '../Accordion';
import H2 from '../Typography/H2';
import IngredientsListSection from './IngredientsListSection';
import { RecipeData } from '@/types';

interface IngredientsListProps extends Pick<RecipeData, 'ingredients_lists'> {}

const IngredientsListV2: FC<IngredientsListProps> = ({ ingredients_lists }) => {
  return (
    <Accordion
      id="ingredients-list"
      title="Ingredients"
      titleElement={H2}
      titleClassName="text-primary m-0 inline"
      className="p-4 bg-black text-primary rounded"
    >
      {ingredients_lists.map((section, index) => (
        <IngredientsListSection {...section} index={index} key={index} />
      ))}
    </Accordion>
  );
};

export default IngredientsListV2;
