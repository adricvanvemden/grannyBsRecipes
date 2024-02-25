import { getRecipe, getRecipeSlugs } from '@/app/actions';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import recipeSchema from '@/schemas/recipeSchema';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { BackButton } from '@/components/BackButton';
import { Badge } from '@/components/ui/badge';

export async function generateStaticParams() {
  const slugs = await getRecipeSlugs();

  return slugs.map((slug) => slug);
}

export default async function RecipePage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const recipe: z.infer<typeof recipeSchema> = await getRecipe(slug);

  if (!recipe) {
    notFound();
  }

  const {
    title,
    shortDescription,
    cuisineTags,
    cookingMethodTags,
    dietaryTags,
    mealTypeTags,
    instructions,
    ingredients,
    cookingTime,
    preparationTime,
    portions,
    body,
    images,
  } = recipe;

  return (
    <div className="prose container my-12">
      <BackButton />
      <h1>{title}</h1>
      <p>{shortDescription}</p>
      <div className="flex flex-col gap-2">
        {cuisineTags?.map((tag, index) => (
          <Badge key={index} variant="secondary" className="mr-2 w-fit">
            {tag}
          </Badge>
        ))}
        {cookingMethodTags?.map((tag, index) => (
          <Badge key={index} variant="secondary" className="mr-2 w-fit bg-slate-400">
            {tag}
          </Badge>
        ))}
        {dietaryTags?.map((tag, index) => (
          <Badge key={index} variant="secondary" className="mr-2 w-fit bg-slate-600">
            {tag}
          </Badge>
        ))}
        {mealTypeTags?.map((tag, index) => (
          <Badge key={index} variant="secondary" className="mr-2 w-fit bg-slate-800">
            {tag}
          </Badge>
        ))}
      </div>
      <h2>Instructions</h2>
      <ol>
        {instructions.map((instruction, index) => (
          <li key={index}>{instruction.instruction}</li>
        ))}
      </ol>
      <h2>Ingredients</h2>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.quantity} {ingredient.metric} {ingredient.name}
          </li>
        ))}
      </ul>
      <p>Cooking Time: {cookingTime} minutes</p>
      <p>Preparation Time: {preparationTime} minutes</p>
      <p>Portions: {portions}</p>
      {body && <p>{body}</p>}
      {images && images.map((image, index) => <Image key={index} src={image} alt="" />)}
    </div>
  );
}
