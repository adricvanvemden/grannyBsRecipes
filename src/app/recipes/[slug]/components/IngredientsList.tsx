import { Checkbox } from '@/components/ui/checkbox';
import { IngredientList } from '@/types';

const IngredientsList: React.FC<IngredientList> = ({ name, ingredients }) => (
  <div className="mb-4 bg-primary/40 p-2 rounded">
    <h3 className="my-0">{name}</h3>
    <ul className="not-prose my-1">
      {ingredients.map((ingredient, index) => {
        const id = `${ingredient.name}-${index}-${name}`;
        return (
          <li key={id} className="flex gap-2 border-neutral border-b last:border-b-0 pt-1 first:pt-0">
            <Checkbox id={id} className="mt-1" />
            <label htmlFor={id} className="peer-aria-checked:text-black/25 cursor-pointer text-black">
              <span>
                <strong>{ingredient.name}</strong> {ingredient.quantity} {ingredient.unit}
              </span>
            </label>
          </li>
        );
      })}
    </ul>
  </div>
);

export default IngredientsList;
