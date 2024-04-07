// Definition: This file contains all the types that are used in the application.
// The types are used to define the structure of the data that is being used in the application.
// This means that it does not match the actual database schema

interface Author {
  username: string;
}

interface IngredientList {
  id: number;
  name: string;
  recipe_id: number;
  ingredients: Ingredient[];
  order: number;
}

interface Ingredient {
  id: number;
  list_id: number;
  name: string;
  quantity: number;
  metric: string;
  order: number;
}

interface InstructionList {
  id: number;
  name: string;
  recipe_id: number;
  instructions: instruction[];
  order: number;
}

interface instruction {
  id: number;
  list_id: number;
  instruction: string;
  order: number;
}

interface Tag {
  id: number;
  name: string;
  type: string;
}

interface Calorie {
  id: number;
  value: number;
  recipe_id: number;
}

interface Macronutrient {
  id: number;
  fat: number;
  protein: number;
  recipe_id: number;
  carbohydrates: number;
}

export interface RecipeData {
  id: number;
  title: string;
  short_description: string;
  cooking_time: string;
  preparation_time: string;
  portions: number;
  body: string;
  slug: string;
  author_id: string;
  author: Author;
  ingredients_lists: IngredientList[];
  instructions_lists: InstructionList[];
  tags: Tag[];
  calories: Calorie[];
  macronutrients: Macronutrient[];
}
