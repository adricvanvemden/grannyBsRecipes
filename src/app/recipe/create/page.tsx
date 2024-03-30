import RecipeForm from '@/components/forms/Recipe/Index';
import { createClient } from '@/lib/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function CreateRecipe() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/login');
  }

  return <RecipeForm />;
}
