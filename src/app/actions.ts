'use server';
import recipeSchema from '@/schemas/recipeSchema';
import fs from 'fs';
import path from 'path';
import slugify from 'slugify';
import { z } from 'zod';
import { createClient as createServerClient } from '@/lib/utils/supabase/server';
import { createClient } from '@/lib/utils/supabase/client';

export async function create(data: z.infer<typeof recipeSchema> & { slug?: string }) {
  // TODO: REPLACE WITH DATABASE FUNCTION
  // ADD AUTHOR DATA (USERID)

  const baseSlug = slugify(data.title, { lower: true });

  let slug = baseSlug;
  let filePath = path.join(process.cwd(), 'recipes', `${slug}.json`);
  let i = 1;

  while (fs.existsSync(filePath)) {
    slug = `${baseSlug}-${i}`;
    filePath = path.join(process.cwd(), 'recipes', `${slug}.json`);
    i++;
  }

  try {
    data.slug = slug;
    fs.writeFileSync(filePath, JSON.stringify(data));
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      console.log({ message: 'Error writing file', error: error.message });
      return { success: false, message: error.message };
    } else {
      console.log({ message: 'Error writing file', error: 'An unknown error occurred' });
      return { success: false, message: 'An unknown error occurred' };
    }
  }
}

export async function getRecipes() {
  const supabase = createServerClient();
  const result = await supabase.from('recipes').select('title, short_description, slug');

  return result;
}

export async function getRecipe(slug: string) {
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
    calories(*),
    macronutrients(*)
  `
    )
    .match({ slug })
    .single();

  return result;
}

export async function getRecipeSlugs() {
  const supabase = createClient();
  const { data: slugs } = await supabase.from('recipes').select('slug');
  if (!slugs) {
    throw new Error('No slugs found');
  }
  return slugs?.map((slug) => slug);
}

// helpers

function fileExists(slug: string): boolean {
  const filePath = path.join(process.cwd(), 'recipes', `${slug}.json`);
  return fs.existsSync(filePath);
}