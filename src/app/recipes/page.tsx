import Card from '@/components/ui/card';
import { getRecipes } from '../actions';
import { createClient } from '@/lib/utils/supabase/server';

export default async function Recipes() {
  const supabase = createClient();
  const { data: recipes, error } = await getRecipes();

  return (
    <div className="container grid sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 md:p-12">
      {recipes?.map((recipe) => (
        <Card key={recipe.slug} {...recipe} href={`/recipes/${recipe.slug}`} />
      ))}
    </div>
  );
}
