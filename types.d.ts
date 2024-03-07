type Instruction = {
  instruction: string;
};

type InstructionSet = {
  title: string;
  instructions: Instruction[];
};

type Ingredient = {
  name: string;
  quantity: number;
  metric: string;
};

type IngredientSet = {
  title: string;
  ingredients: Ingredient[];
};

type Recipe = {
  title: string;
  shortDescription: string;
  instructions: InstructionSet[];
  ingredients: IngredientSet[];
  cookingTime: number;
  preparationTime: number;
  portions: number;
  body: string;
  images: string[]; // Assuming image URLs are strings
  cuisineTags: string[];
  mealTypeTags: string[];
  dietaryTags: string[];
  cookingMethodTags: string[];
  slug: string;
};
