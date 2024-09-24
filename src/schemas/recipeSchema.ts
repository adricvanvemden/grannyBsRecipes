import { z } from 'zod';

const Instruction = z.object({
  instruction: z.string().min(5, 'You want to cook air? Instruction must be at least 5 characters long'),
});

const InstructionSet = z.object({
  title: z.string().min(1, 'Shaking my head... Name your instructions!'),
  instructions: z.array(Instruction),
});

const Ingredient = z.object({
  name: z.string().min(2, 'What is this? A recipe for ants? Ingredient name must be at least 2 characters long'),
  quantity: z.string(),
  unit: z.string(),
});

const IngredientSet = z.object({
  title: z.string().min(1, 'Shaking my head... Name your ingredient set!'),
  ingredients: z.array(Ingredient),
});

const RecipeSchema = z.object({
  title: z.string().min(2, 'Who names a recipe with one character? Title must be at least 2 character long'),
  shortDescription: z
    .string()
    .min(
      10,
      'How can you describe a recipe in less than 10 characters? Short description must be at least 10 characters long'
    ),
  instructions: z.array(InstructionSet),
  ingredients: z.array(IngredientSet),
  cookingTime: z.number().min(0, 'Are you a time traveler? Cooking time cannot be negative'),
  preparationTime: z.number().min(0, 'Do you live in the past? Preparation time cannot be negative'),
  portions: z.number().min(0, 'Does it pull calories out of your body? Portions cannot be negative'),
  body: z.string().optional(),
  images: z.array(z.string()).optional(),
  tags: z.array(z.string()).min(1, 'What is a recipe without tags? Add at least one tag'),
  nutrients: z
    .object({
      fat: z.number().optional(),
      carbohydrates: z.number().optional(),
      protein: z.number().optional(),
      calories: z.number().optional(),
    })
    .optional(),
});

export default RecipeSchema;
