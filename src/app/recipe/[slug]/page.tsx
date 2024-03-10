import { getRecipe, getRecipeSlugs } from '@/app/actions';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import recipeSchema from '@/schemas/recipeSchema';
import { z } from 'zod';
import { BackButton } from '@/components/BackButton';
import TimeAndServing from './components/TimeAndServing';
import IngredientsList from './components/IngredientsList';
import TagSection from './components/TagSection';
import InstructionsList from './components/InstructiontsList';
import Author from './components/Author';

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
    author,
  } = recipe;

  return (
    <div className="prose max-w-[1200px] container my-12">
      <BackButton />

      <h1 className="mb-0 text-2xl md:text-4xl text-center">{title}</h1>
      <hr className="my-2" />
      <Author name={author} />
      <div className="flex gap-4">
        <p className="my-4">{shortDescription}</p>
        <div className="flex flex-wrap gap-2 bg-primary-foreground w-fit p-4 rounded text-sm">
          <TagSection title="Cuisine" tags={cuisineTags} />
          <TagSection title="Cooking Method" tags={cookingMethodTags} />
          <TagSection title="Dietary" tags={dietaryTags} />
          <TagSection title="Type" tags={mealTypeTags} />
        </div>
      </div>
      <TimeAndServing preparationTime={preparationTime} cookingTime={cookingTime} portions={portions} />
      <div className="flex flex-col md:flex-row gap-4 mt-8">
        <div className="w-full md:min-w-[350px] md:w-fit md:max-w-[500px] bg-primary-foreground p-4 h-fit rounded">
          <h2 className="mt-0">Ingredients</h2>
          {ingredients.map((ingredient, index) => (
            <IngredientsList key={index} title={ingredient.title} ingredients={ingredient.ingredients} index={index} />
          ))}
        </div>
        <div className="max-w-[800px]">
          <h2 className="mt-4">Instructions</h2>
          {instructions.map((instruction, index) => (
            <InstructionsList
              key={index}
              title={instruction.title}
              instructions={instruction.instructions}
              index={index}
            />
          ))}
        </div>
      </div>

      {body && <p>{body}</p>}
      {images && images.map((image, index) => <Image key={index} src={image} alt="" />)}
    </div>
  );
}
