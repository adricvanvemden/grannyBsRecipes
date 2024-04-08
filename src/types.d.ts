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
  unit: string;
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

interface Nutrient {
  id: number;
  fat: number;
  protein: number;
  recipe_id: number;
  carbohydrates: number;
  calories: number;
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
  nutrients: Nutrient[];
}

export interface TagOptions {
  type: string;
  options: { id: number; name: string }[];
}