'use server';
import { selectRecipe, selectRecipeSlugs } from '@/app/actions';
import { notFound } from 'next/navigation';
import { cn } from '@/lib/utils/utils';
import { Hero } from '@/components/2.0/Hero/Hero';
import IngredientsListV2 from '@/components/2.0/IngredientsList/IngredientsList';
import InstructionsListV2 from '@/components/2.0/InstructionsList/InstructionsList';
import { RecipeData } from '@/types';
import Info from '@/components/2.0/Info/Info';
import Container from '@/components/2.0/Container';
import Markdown from '@/components/2.0/Markdown';

export async function generateStaticParams() {
  return await selectRecipeSlugs();
}

export default async function RecipePage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  let { data: recipeData, error } = await selectRecipe(slug);

  if (!recipeData) {
    notFound();
  }

  const {
    title,
    short_description,
    body,
    preparation_time: prepTime,
    cooking_time: cookTime,
    portions: serves,
    nutrients,
    tags,
  }: RecipeData = recipeData;

  return (
    <Container className={cn('prose max-w-[1200px] container py-32')}>
      <Hero title={title} description={short_description} tags={tags} />

      <Container className="flex flex-col gap-12 mt-12 items-center">
        <Markdown content={body} />
        <Info prepTime={prepTime} cookTime={cookTime} serves={serves} nutrients={nutrients[0]} />
        <IngredientsListV2 {...recipeData} />
        <InstructionsListV2 {...recipeData} />
      </Container>
    </Container>
  );
}
