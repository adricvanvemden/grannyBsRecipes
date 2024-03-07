import Card from '@/components/ui/card';
import { getRecipes } from './actions';

export default async function Home() {
  const recipes = await getRecipes();

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 md:p-12">
      {recipes.map((recipe) => (
        <Card key={recipe.slug} {...recipe} href={`/recipe/${recipe.slug}`} />
      ))}
    </div>
  );
}
