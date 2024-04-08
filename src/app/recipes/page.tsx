import Card from '@/components/ui/card';
import { selectRecipes } from '../actions';

export default async function Recipes() {
  const { data: recipes, error } = await selectRecipes();

  return (
    <div className="container grid sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 md:p-12">
      {recipes?.map((recipe) => (
        <Card key={recipe.slug} {...recipe} href={`/recipes/${recipe.slug}`} />
      ))}
    </div>
  );
}
