import Card from '@/components/ui/card';
import { getRecipes } from './actions';

export default async function Home() {
  const recipes = await getRecipes();

  return (
    <div>
      {recipes.map((recipe) => (
        <Card key={recipe.slug} {...recipe} href={`/recipe/${recipe.slug}`} />
      ))}
    </div>
  );
}
