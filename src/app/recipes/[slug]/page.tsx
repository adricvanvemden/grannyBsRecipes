'use server';

import { getRecipe, getRecipeSlugs } from '@/app/actions';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { BackButton } from '@/components/BackButton';
import TimeAndServing from './components/TimeAndServing';
import IngredientsList from './components/IngredientsList';
import TagSection from './components/TagSection';
import InstructionsList from './components/InstructiontsList';
import Author from './components/Author';
import { cn } from '@/lib/utils/utils';
import { kalam } from '@/app/fonts';
import { createClient as createServerClient } from '@/lib/utils/supabase/server';
import { RecipeData } from '../../../../types';

export async function generateStaticParams() {
  return await getRecipeSlugs();
}

export default async function RecipePage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const supabase = createServerClient();
  let { data: recipeData, error } = await getRecipe(slug);

  if (!recipeData) {
    notFound();
  }

  const {
    title,
    short_description,
    body,
    preparation_time,
    cooking_time,
    portions,
    author,
    ingredients_lists,
    instructions_lists,
    macronutrients,
    calories,
    tags,
  }: RecipeData = recipeData;

  return (
    <div className={cn('prose max-w-[1200px] container my-6', kalam.className)}>
      <BackButton />

      <h1 className="mb-0 text-2xl md:text-4xl text-center">{title}</h1>
      <Author name={author.username} />
      <hr className="-mt-[5px] mb-2 border-neutral/30" />
      <p className="text-center my-4">{short_description}</p>
      <div className="mx-auto flex flex-wrap gap-2 border-neutral border-2 w-fit p-4 rounded text-sm">
        <TagSection title="Cuisine" tags={tags.filter((tag) => tag.type === 'Cuisine')} />
        <TagSection title="Dietary" tags={tags.filter((tag) => tag.type === 'Dietary')} />
        <TagSection title="Type" tags={tags.filter((tag) => tag.type === 'Type')} />
        <TagSection title="Cooking Method" tags={tags.filter((tag) => tag.type === 'Cooking Method')} />
      </div>
      {body && <p>{body}</p>}
      {/* {images && images.map((image, index) => <Image key={index} src={image} alt="" />)} */}
      <div className="flex flex-col md:flex-row gap-4 mt-8">
        <div className="md:sticky md:top-8 w-fit mx-auto md:min-w-[350px] md:w-fit md:max-w-[500px] bg-primary/20 p-4 pb-1 h-fit rounded">
          <TimeAndServing preparationTime={preparation_time} cookingTime={cooking_time} portions={portions} />
          <h2 className="my-0 mb-2">Ingredients</h2>
          {ingredients_lists?.map((ingredient, index) => (
            <IngredientsList key={index} title={ingredient.name} ingredients={ingredient.ingredients} index={index} />
          ))}
        </div>
        <div className="max-w-[800px] bg-secondary/30 px-4 rounded">
          <h2 className="mt-4 mb-2">Instructions</h2>
          {instructions_lists?.map((instruction, index) => (
            <InstructionsList
              key={index}
              title={instruction.name}
              instructions={instruction.instructions}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
