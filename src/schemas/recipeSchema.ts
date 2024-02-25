import { z } from 'zod';

const ingredientSchema = z.object({
  name: z.string().min(1),
  quantity: z.number().min(0),
  metric: z.string(),
});

const recipeSchema = z.object({
  title: z.string().min(2).max(50),
  shortDescription: z.string().min(2).max(100),
  instructions: z
    .array(z.object({ instruction: z.string().min(1) }))
    .nonempty()
    .min(1)
    .max(100),
  ingredients: z.array(ingredientSchema).nonempty().min(1).max(100),
  cookingTime: z.number(),
  preparationTime: z.number(),
  portions: z.number(),
  body: z.string().optional(),
  images: z.array(z.string()).optional(),
  cuisineTags: z.array(z.string()).optional(),
  mealTypeTags: z.array(z.string()).optional(),
  dietaryTags: z.array(z.string()).optional(),
  cookingMethodTags: z.array(z.string()).optional(),
});

export default recipeSchema;
