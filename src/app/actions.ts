'use server';
import recipeSchema from '@/schemas/recipeSchema';
import fs from 'fs';
import path from 'path';
import slugify from 'slugify';
import { z } from 'zod';

export async function create(data: z.infer<typeof recipeSchema>) {
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
    fs.writeFileSync(filePath, JSON.stringify(data));
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      console.log({ message: 'Error writing file', error: error.message });
      return { success: false, message: error.message};
    } else {
      console.log({ message: 'Error writing file', error: 'An unknown error occurred' });
      return { success: false, message: 'An unknown error occurred' };
    }

  }
}
