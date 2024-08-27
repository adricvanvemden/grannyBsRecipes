'use client';

import recipeSchema from '@/schemas/recipeSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Ingredients from './Ingredients';
import Instructions from './Instructions';
import { insertRecipe } from '@/app/actions';
import { toast } from 'sonner';
import { FancyMultiSelect } from '@/components/FancyMultiSelect';
import { useState } from 'react';
import { TagOptions } from '@/types';
import Times from './Times';
import Nutrients from './Nutrients';
import { createClient } from '@/lib/utils/supabase/client';

export type RecipeFormValues = z.infer<typeof recipeSchema>;

const RecipeForm: React.FC<{ tagOptions: TagOptions[] }> = ({ tagOptions }) => {
  const [resetKey, setResetKey] = useState<string>('');
  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      instructions: [{ title: '', instructions: [{ instruction: '' }] }],
      ingredients: [{ title: '', ingredients: [{ name: '', quantity: 0, unit: '' }] }],
      title: '',
      shortDescription: '',
      cookingTime: 0,
      preparationTime: 0,
      portions: 0,
      body: '',
      images: [],
      tags: [],
    },
  });

  async function onSubmit(values: z.infer<typeof recipeSchema>) {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    const { data: recipe, error } = await insertRecipe(values, data?.user?.id);

    if (recipe) {
      toast.success("Recipe added to GrannyB's Recipes book!");
      form.reset({});
      setResetKey(Date.now().toString());
    } else {
      toast.error('Error: Could not add recipe', { description: error });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-black">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="shortDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short description</FormLabel>
              <FormControl>
                <Textarea placeholder="Short description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Instructions form={form} />

        <Ingredients form={form} />

        <div className="bg-accent/60 text-gray-800 rounded-md p-4 text-sm w-fit flex flex-col">
          <strong>Please provide comprehensive details, ensuring consistency with the ingredients listed above.</strong>
          <strong>Remember to align the portion size and nutrients with the ingredients and their quantities.</strong>
        </div>

        <Times form={form} />

        <Nutrients form={form} />

        <FormField
          control={form.control}
          name="portions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Portion size</FormLabel>
              <FormControl>
                <Input
                  placeholder="Portion size"
                  type="number"
                  min={0}
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <FancyMultiSelect
                  key={resetKey}
                  options={tagOptions}
                  placeholder="Search tags..."
                  onChange={(values) => {
                    field.onChange(values.map(({ value }) => value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Body <span className="text-secondary text-xs">(optional)</span>
              </FormLabel>
              <FormControl>
                <Textarea placeholder="Body" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Images <span className="text-secondary text-xs">(optional)</span>
              </FormLabel>
              <FormControl>
                <Input id="picture" type="file" multiple accept="image/png, image/jpeg, image/webp" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          ADD RECIPE
        </Button>
      </form>
    </Form>
  );
};

export default RecipeForm;
