import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Ingredient } from '@/types';

interface IngredientsListItemProps extends Ingredient {
  index: number;
}

const IngredientsListItem: React.FC<IngredientsListItemProps> = ({ name, quantity, unit, index }) => {
  const key = `ingredients-ingredient-${index}`;
  return (
    <label id={key} key={key} className="flex gap-2 ml-2 text-gray cursor-pointer">
      <Checkbox className="peer" />
      <span className="font-light -mt-1.5 peer-data-[state=checked]:text-gray/30">
        <span className="font-bold">{name} </span>
        {quantity} {unit}
      </span>
    </label>
  );
};

export default IngredientsListItem;
