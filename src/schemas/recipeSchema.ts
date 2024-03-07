import { z } from 'zod';

const Instruction = z.object({
  instruction: z.string(),
});

const InstructionSet = z.object({
  title: z.string(),
  instructions: z.array(Instruction),
});

const Ingredient = z.object({
  name: z.string(),
  quantity: z.number(),
  metric: z.string(),
});

const IngredientSet = z.object({
  title: z.string(),
  ingredients: z.array(Ingredient),
});

const RecipeSchema = z.object({
  title: z.string(),
  shortDescription: z.string(),
  instructions: z.array(InstructionSet),
  ingredients: z.array(IngredientSet),
  cookingTime: z.number(),
  preparationTime: z.number(),
  portions: z.number(),
  body: z.string(),
  images: z.array(z.string()),
  cuisineTags: z.array(z.string()),
  mealTypeTags: z.array(z.string()),
  dietaryTags: z.array(z.string()),
  cookingMethodTags: z.array(z.string()),
  slug: z.string(),
  author: z.string(),
});

export default RecipeSchema;
