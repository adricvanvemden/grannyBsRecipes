import { Checkbox } from '@/components/ui/checkbox';

interface Ingredient {
  name: string;
  quantity: number;
  metric: string;
}

interface IngredientsListProps {
  title: string;
  ingredients: Ingredient[];
}

const IngredientsList: React.FC<IngredientsListProps> = ({ title, ingredients }) => (
  <>
    <strong>{title}</strong>
    <ul className="not-prose my-2">
      {ingredients.map((ingredient, index) => {
        const id = `${ingredient.name}-${index}-${title}`;
        return (
          <li key={id} className="flex items-center gap-2">
            <Checkbox id={id} />
            <label htmlFor={id} className="peer-aria-checked:line-through">
              {ingredient.quantity} {ingredient.metric} {ingredient.name}
            </label>
          </li>
        );
      })}
    </ul>
  </>
);

export default IngredientsList;
