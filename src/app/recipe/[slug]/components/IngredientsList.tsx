import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

const IngredientsList: React.FC<IngredientSet & { index: number }> = ({ title, ingredients, index }) => (
  <div className={cn(index > 0 ? 'my-8' : 'mb-8')}>
    <strong>{title}</strong>
    <ul className="not-prose my-2">
      {ingredients.map((ingredient, index) => {
        const id = `${ingredient.name}-${index}-${title}`;
        return (
          <li key={id} className="flex items-center gap-2">
            <Checkbox id={id} />
            <label htmlFor={id} className="peer-aria-checked:text-black/25 flex gap-1">
              <strong>{ingredient.name}</strong>
              <span>{ingredient.quantity}</span>
              <span> {ingredient.metric}</span>
            </label>
          </li>
        );
      })}
    </ul>
  </div>
);

export default IngredientsList;
