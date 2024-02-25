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

function RecipeForm() {
  const form = useForm<z.infer<typeof recipeSchema>>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      ingredients: [{ name: '', quantity: 0, metric: '' }],
      instructions: [{ instruction: '' }],
      title: '',
      cookingTime: 0,
      preparationTime: 0,
      portions: 0,
      body: '',
      images: [],
    },
  });

  async function onSubmit(values: z.infer<typeof recipeSchema>) {
    const { success, message } = await create(values);

    if (success) {
      toast.success('Recipe has been created');
      form.reset({});
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

        {/* Instructions inputs */}
        <div className="space-y-2">
          <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Instructions
          </span>
          <Instructions form={form} />
        </div>

        <div className="space-y-2">
          <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Ingredients
          </span>
          <Ingredients form={form} />
        </div>

        <FormField
          control={form.control}
          name="cookingTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cooking time</FormLabel>
              <FormControl>
                <Input
                  placeholder="cooking"
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
              <FormLabel>preparation time</FormLabel>
              <FormControl>
                <Input
                  placeholder="preparation"
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
              <FormLabel>portion size</FormLabel>
              <FormControl>
                <Input
                  placeholder="portion"
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
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                body <span className="text-gray-400 text-xs">(optional)</span>
              </FormLabel>
              <FormControl>
                <Textarea placeholder="body" {...field} />
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
