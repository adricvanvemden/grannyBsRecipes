import { z } from 'zod';

const Instruction = z.object({
  instruction: z.string().min(1),
});

const InstructionSet = z.object({
  title: z.string().min(1),
  instructions: z.array(Instruction),
});

const Ingredient = z.object({
  name: z.string().min(1),
  quantity: z.number(),
  metric: z.string(),
});

const IngredientSet = z.object({
  title: z.string().min(1),
  ingredients: z.array(Ingredient),
});

const RecipeSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 character long'),
  shortDescription: z.string().min(10, 'Short description must be at least 10 character long'),
  instructions: z.array(InstructionSet),
  ingredients: z.array(IngredientSet),
  cookingTime: z.number().min(1, 'Cooking time is required'),
  preparationTime: z.number().min(1, 'Preparation time is required'),
  portions: z.number().min(1, 'Portions is required'),
  body: z.string().optional(),
  images: z.array(z.string()).optional(),
  cuisineTags: z.array(z.string()).min(1, 'Cuisine is required'),
  mealTypeTags: z.array(z.string()).min(1, 'Meal type is required'),
  dietaryTags: z.array(z.string()).min(1, 'Dietary is required'),
  cookingMethodTags: z.array(z.string()).min(1, 'Cooking method is required'),
  slug: z.string(),
  author: z.string(),
});

export default RecipeSchema;
