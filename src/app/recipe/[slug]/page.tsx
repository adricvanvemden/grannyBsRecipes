import { getRecipe, getRecipeSlugs } from '@/app/actions';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import recipeSchema from '@/schemas/recipeSchema';
import { z } from 'zod';
import { Checkbox } from '@/components/ui/checkbox';
import { BackButton } from '@/components/BackButton';
import { Badge } from '@/components/ui/badge';
import TimeAndServing from './components/TimeAndServing';
import IngredientsList from './components/IngredientsList';
import TagSection from './components/TagSection';
import InstructionsList from './components/InstructiontsList';

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

      <h1 className="mb-0">{title}</h1>
      <hr className="my-2" />
      <p className="my-4">{shortDescription}</p>

      <div className="flex gap-2 flex-wrap">
        <TagSection title="Cuisine" tags={cuisineTags} />
        <TagSection title="Cooking Method" tags={cookingMethodTags} />
        <TagSection title="Dietary" tags={dietaryTags} />
        <TagSection title="Type" tags={mealTypeTags} />
      </div>

      <TimeAndServing preparationTime={preparationTime} cookingTime={cookingTime} portions={portions} />

      <h2>Ingredients</h2>
      <IngredientsList title="For the crust" ingredients={ingredients} />
      <IngredientsList title="For the patty" ingredients={ingredients} />

      <h2>Instructions</h2>
      <InstructionsList instructions={instructions} />

      {body && <p>{body}</p>}
      {images && images.map((image, index) => <Image key={index} src={image} alt="" />)}
    </div>
  );
}
