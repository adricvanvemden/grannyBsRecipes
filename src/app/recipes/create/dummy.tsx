'use client';

import { createClient } from '@/lib/utils/supabase/client';

const Dummy = () => {
  const supabase = createClient();
  const createDummyRecipe = async () => {
    console.log('Creating dummy recipe...');
    const authorId = '6c5bff91-5782-49c7-92fa-90d2a6206f3a';

    // Inserting a recipe
    const { data: recipeData, error: recipeError } = await supabase
      .from('recipes')
      .insert([
        {
          title: 'Vegetarian Pasta Primavera',
          short_description: 'A delicious and colorful pasta dish',
          cooking_time: '20 minutes',
          preparation_time: '15 minutes',
          portions: 4,
          body: 'This flavorful pasta primavera is packed with fresh vegetables and herbs, making it a perfect springtime meal.',
          slug: 'vegetarian-pasta-primavera-3',
          author_id: authorId,
        },
      ])
      .select();

    const recipeId = recipeData[0].id;

    // Inserting instructions lists
    const instructions = [
      {
        name: 'Preparation',
        steps: [
          'Cook pasta according to package instructions.',
          'Blanch broccoli florets in boiling water for 2 minutes, then drain.',
          'Heat olive oil in a large skillet over medium heat, add minced garlic, and sauté until fragrant.',
        ],
      },
      {
        name: 'Sauce',
        steps: [
          'Add vegetable broth, lemon juice, salt, pepper, and red pepper flakes to the skillet. Simmer for 5 minutes.',
          'Add cherry tomatoes, zucchini, and yellow bell pepper to the skillet. Cook until vegetables are tender.',
        ],
      },
      {
        name: 'Assembly',
        steps: [
          'Combine cooked pasta and blanched broccoli with the sauce in the skillet. Toss until well coated.',
          'Serve pasta primavera topped with grated Parmesan cheese, chopped parsley, and lemon zest.',
        ],
      },
    ];

    // Inserting instructions dynamically
    for (const [index, instructionSet] of instructions.entries()) {
      const { data: instructionsListData, error: instructionsListError } = await supabase
        .from('instructions_lists')
        .insert({
          recipe_id: recipeId,
          name: instructionSet.name,
          order: index + 1,
        })
        .select();

      const instructionsListId = instructionsListData[0].id;

      const instructionItems = instructionSet.steps.map((step, order) => ({
        list_id: instructionsListId,
        instruction: step,
        order: order + 1,
      }));

      await supabase.from('instructions').insert(instructionItems);
    }

    // Inserting ingredients lists
    const ingredients = [
      {
        name: 'Pasta and Vegetables',
        items: [
          { name: 'Pasta', quantity: 400, metric: 'grams' },
          { name: 'Cherry tomatoes', quantity: 1, metric: 'cup' },
          { name: 'Zucchini', quantity: 1, metric: 'unit' },
          { name: 'Yellow bell pepper', quantity: 1, metric: 'unit' },
          { name: 'Broccoli florets', quantity: 2, metric: 'cups' },
          { name: 'Fresh basil leaves', quantity: 0.25, metric: 'cup' },
        ],
      },
      {
        name: 'Sauce',
        items: [
          { name: 'Olive oil', quantity: 2, metric: 'tablespoons' },
          { name: 'Garlic cloves', quantity: 3, metric: 'unit' },
          { name: 'Vegetable broth', quantity: 1, metric: 'cup' },
          { name: 'Lemon juice', quantity: 2, metric: 'tablespoons' },
          { name: 'Salt', quantity: 1, metric: 'teaspoon' },
          { name: 'Black pepper', quantity: 0.5, metric: 'teaspoon' },
          { name: 'Red pepper flakes', quantity: 0.25, metric: 'teaspoon' },
        ],
      },
      {
        name: 'Garnish',
        items: [
          { name: 'Parmesan cheese', quantity: 0.25, metric: 'cup' },
          { name: 'Fresh parsley', quantity: 2, metric: 'tablespoons' },
          { name: 'Lemon zest', quantity: 1, metric: 'teaspoon' },
        ],
      },
    ];

    // Inserting ingredients dynamically
    for (const [index, ingredientSet] of ingredients.entries()) {
      const { data: ingredientsListData, error: ingredientsListError } = await supabase
        .from('ingredients_lists')
        .insert({
          recipe_id: recipeId,
          name: ingredientSet.name,
          order: index + 1,
        })
        .select();

      const ingredientsListId = ingredientsListData[0].id;

      const ingredientItems = ingredientSet.items.map((item, order) => ({
        list_id: ingredientsListId,
        name: item.name,
        quantity: item.quantity,
        metric: item.metric,
        order: order + 1,
      }));

      await supabase.from('ingredients').insert(ingredientItems);
    }

    // Inserting recipe tags
    const recipeTags = [
      { recipe_id: recipeId, tag_id: 1 }, // Cuisine: Italian
      { recipe_id: recipeId, tag_id: 2 }, // Diet: Vegetarian
    ];

    await supabase.from('recipe_tags').insert(recipeTags);

    // Inserting macronutrients
    await supabase.from('macronutrients').insert([
      { recipe_id: recipeId, protein: 25, carbohydrates: 30, fat: 10 }, // Example values
    ]);

    // Inserting calories
    await supabase.from('calories').insert([
      { recipe_id: recipeId, value: 350 }, // Example calorie value
    ]);
  };
  return (
    <button onClick={createDummyRecipe} className="btn btn-primary mb-4">
      Create Dummy Recipe
    </button>
  );
};

export default Dummy;
