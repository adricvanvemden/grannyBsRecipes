'use server';
import recipeSchema from '@/schemas/recipeSchema';
import slugify from 'slugify';
import { z } from 'zod';
import { createClient as createServerClient } from '@/lib/utils/supabase/server';
import { createClient } from '@/lib/utils/supabase/client';

export async function insertRecipe(data: z.infer<typeof recipeSchema>, authorId: string | undefined) {
  if (!authorId) {
    throw new Error('Author ID is required');
  }

  let slug = slugify(data.title, { lower: true });

  const supabase = createServerClient();
  const { data: _slug } = await supabase.from('recipes').select('slug').match({ slug });

  if (_slug && _slug?.length > 0) {
    const randomString = Math.random().toString(36).substring(7);
    slug = `${slug}-${randomString}`;
  }

  // Insert main recipe data
  const { data: recipeData, error: recipeError } = await supabase
    .from('recipes')
    .insert([
      {
        title: data.title,
        short_description: data.shortDescription,
        cooking_time: data.cookingTime,
        preparation_time: data.preparationTime,
        portions: data.portions,
        body: data.body,
        slug: slug,
        author_id: authorId,
      },
    ])
    .select();

  if (!recipeData) {
    throw new Error('Recipe data not found');
  }

  const recipeId = recipeData[0].id;

  // Insert instructions
  {
    data.instructions.map(async (instructionList, order) => {
      const { title, instructions } = instructionList;
      const { data: instructionsListData } = await supabase
        .from('instructions_lists')
        .insert({
          recipe_id: recipeId,
          name: title,
          order: order + 1,
        })
        .select();

      if (!instructionsListData) {
        throw new Error('Instructions list data not found');
      }

      const instructionsListId = instructionsListData[0].id;

      const instructionItems = instructions.map((step, order) => ({
        list_id: instructionsListId,
        instruction: step.instruction,
        order: order + 1,
      }));

      await supabase.from('instructions').insert(instructionItems);
    });
  }

  // Insert ingredients
  {
    data.ingredients.map(async (ingredientList, order) => {
      const { title, ingredients } = ingredientList;
      const { data: ingredientsListData } = await supabase
        .from('ingredients_lists')
        .insert({
          recipe_id: recipeId,
          name: title,
          order: order + 1,
        })
        .select();

      if (!ingredientsListData) {
        throw new Error('Ingredients list data not found');
      }

      const ingredientsListId = ingredientsListData[0].id;

      const ingredientItems = ingredients.map((ingredient, order) => ({
        list_id: ingredientsListId,
        name: ingredient.name,
        quantity: ingredient.quantity,
        unit: ingredient.unit,
        order: order + 1,
      }));

      await supabase.from('ingredients').insert(ingredientItems);
    });
  }

  // Insert tags
  {
    const tags = data.tags.map((tag) => ({
      recipe_id: recipeId,
      tag_id: tag,
    }));

    await supabase.from('recipe_tags').insert(tags);
  }

  // Insert nutrients
  if (data.nutrients) {
    await supabase.from('nutrients').insert({ recipe_id: recipeId, ...data.nutrients });
  }

  return { data: recipeData[0], error: recipeError };
}

export async function selectRecipes() {
  const supabase = createServerClient();
  const result = await supabase.from('recipes').select('title, short_description, slug');

  return result;
}

export async function selectRecipe(slug: string) {
  const supabase = createServerClient();
  const result = await supabase
    .from('recipes')
    .select(
      `
    *,
    author: profiles(username),
    ingredients_lists(*, ingredients(*)),
    instructions_lists(*, instructions(*)),
    tags(*),
    nutrients(*)
  `
    )
    .match({ slug })
    .single();

  return result;
}

export async function selectRecipeSlugs() {
  const supabase = createClient();
  const { data: slugs } = await supabase.from('recipes').select('slug');
  if (!slugs) {
    throw new Error('No slugs found');
  }
  return slugs?.map((slug) => slug);
}

export async function selectTags() {
  const supabase = createClient();
  const result = await supabase.from('tags').select('*');
  return result;
}