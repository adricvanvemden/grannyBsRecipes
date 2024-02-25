'use server';
import recipeSchema from '@/schemas/recipeSchema';
import fs from 'fs';
import path from 'path';
import slugify from 'slugify';
import { z } from 'zod';

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
  const recipeDirectory = path.join(process.cwd(), 'recipes');
  const filenames = fs.readdirSync(recipeDirectory);

  const recipes = filenames.map((filename) => {
    const filePath = path.join(recipeDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');

    return JSON.parse(fileContents);
  });

  return recipes;
}

export async function getRecipe(slug: string) {
  if (!fileExists(slug)) {
    return null;
  }

  const filePath = path.join(process.cwd(), 'recipes', `${slug}.json`);
  const fileContents = fs.readFileSync(filePath, 'utf8');

  return JSON.parse(fileContents);
}

export async function getRecipeSlugs() {
  const recipeDirectory = path.join(process.cwd(), 'recipes');
  const filenames = fs.readdirSync(recipeDirectory);

  return filenames.map((filename) => filename.replace('.json', ''));
}

// helpers

function fileExists(slug: string): boolean {
  const filePath = path.join(process.cwd(), 'recipes', `${slug}.json`);
  return fs.existsSync(filePath);
}