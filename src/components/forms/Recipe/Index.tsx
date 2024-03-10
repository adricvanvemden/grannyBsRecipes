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
import { create } from '@/app/actions';
import { toast } from 'sonner';
import { FancyMultiSelect } from '@/components/FancyMultiSelect';
import { COOKING_METHOD_TAGS, CUISINE_TAGS, DIETARY_TAGS, MEAL_TYPE_TAGS } from '@/app/Constants';
import { useState } from 'react';

export type RecipeFormValues = z.infer<typeof recipeSchema>;

function RecipeForm() {
  const [resetKey, setResetKey] = useState<string>('');
  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      instructions: [{ title: '', instructions: [{ instruction: '' }] }],
      ingredients: [{ title: '', ingredients: [{ name: '', quantity: 0, metric: '' }] }],
      title: '',
      shortDescription: '',
      cookingTime: 0,
      preparationTime: 0,
      portions: 0,
      body: '',
      images: [],
      cuisineTags: [],
      mealTypeTags: [],
      dietaryTags: [],
      cookingMethodTags: [],
      slug: '',
      author: '',
    },
  });

  async function onSubmit(values: z.infer<typeof recipeSchema>) {
    const { success, message } = await create(values);

    if (success) {
      toast.success('Recipe has been created');
      form.reset({});
      setResetKey(Date.now().toString());
    } else {
      toast.error('Error: Recipe could not be created', { description: message });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 container my-8 py-4 border rounded">
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

        <FormField
          control={form.control}
          name="cookingTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cooking time</FormLabel>
              <FormControl>
                <Input
                  placeholder="Cooking time"
                  type="number"
                  min={0}
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormDescription>in minutes</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="preparationTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preparation time</FormLabel>
              <FormControl>
                <Input
                  placeholder="Preparation time"
                  type="number"
                  min={0}
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormDescription>in minutes</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

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
          name="cuisineTags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cuisine</FormLabel>
              <FormControl>
                <FancyMultiSelect
                  key={resetKey}
                  options={CUISINE_TAGS}
                  placeholder="Search cuisine..."
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
          name="mealTypeTags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meal Type</FormLabel>
              <FormControl>
                <FancyMultiSelect
                  key={resetKey}
                  options={MEAL_TYPE_TAGS}
                  placeholder="Search meal type..."
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
          name="dietaryTags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dietary Type</FormLabel>
              <FormControl>
                <FancyMultiSelect
                  key={resetKey}
                  options={DIETARY_TAGS}
                  placeholder="Search dietary type..."
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
          name="cookingMethodTags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cooking Method</FormLabel>
              <FormControl>
                <FancyMultiSelect
                  key={resetKey}
                  options={COOKING_METHOD_TAGS}
                  placeholder="Search cooking method..."
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
                Body <span className="text-gray-400 text-xs">(optional)</span>
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
                Images <span className="text-gray-400 text-xs">(optional)</span>
              </FormLabel>
              <FormControl>
                <Input id="picture" type="file" multiple accept="image/png, image/jpeg, image/webp" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default RecipeForm;
