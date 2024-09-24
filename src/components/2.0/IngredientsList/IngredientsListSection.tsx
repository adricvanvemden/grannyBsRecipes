'use server';
import React from 'react';
import IngredientListItem from './IngredientListItem';
import Accordion from '../Accordion';
import { IngredientList } from '@/types';
import Container from '../Container';

interface IngredientsListSectionProps extends IngredientList {
  index: number;
}

const IngredientsListSection: React.FC<IngredientsListSectionProps> = ({ name, ingredients, index }) => {
  const key = `ingredients-section-${index}`;
  return (
    <Accordion id={key} title={name} key={key} className="flex items-center justify-between py-2 ml-2">
      <Container className="gap-2 inline-flex flex-col">
        {ingredients.map((ingredient, index) => (
          <IngredientListItem {...ingredient} index={index} key={index} />
        ))}
      </Container>
    </Accordion>
  );
};

export default IngredientsListSection;
