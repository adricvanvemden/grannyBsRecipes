import RecipeForm from '@/components/forms/Recipe/Index';
import { createClient } from '@/lib/utils/supabase/server';
import { redirect } from 'next/navigation';
import { selectTags } from '@/app/actions';
import { TagOptions } from '@/types';

export default async function CreateRecipe() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/login');
  }

  const { data: tags } = await selectTags();

  const formattedTags: TagOptions[] = tags?.reduce((acc, tag) => {
    const existingType = acc.find((t: { id: number; type: string; name: string }) => t.type === tag.type);

    if (existingType) {
      existingType.options.push({ id: tag.id, name: tag.name });
    } else {
      acc.push({ type: tag.type, options: [{ id: tag.id, name: tag.name }] });
    }

    return acc;
  }, []);

  return (
    <div className="container my-6">
      <h2 className="font-bold text-2xl mb-4">Write A New Recipe</h2>
      <div className="backdrop-filter backdrop-blur-md bg-secondary/20 p-4">
        <RecipeForm tagOptions={formattedTags} />
      </div>
    </div>
  );
}
