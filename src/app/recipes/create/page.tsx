import RecipeForm from '@/components/forms/Recipe/Index';
import { createClient } from '@/lib/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function CreateRecipe() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/login');
  }

  return (
    <div className="container my-6">
      <h2 className="font-bold text-2xl mb-4">Write A New Recipe</h2>
      <div className="backdrop-filter backdrop-blur-md bg-secondary/20 p-4">
        <RecipeForm />
      </div>
    </div>
  );
}
