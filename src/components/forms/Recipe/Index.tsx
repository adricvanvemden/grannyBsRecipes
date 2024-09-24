'use client';

import recipeSchema from '@/schemas/recipeSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import Ingredients from './Ingredients';
import Instructions from './Instructions';
import { insertRecipe } from '@/app/actions';
import { toast } from 'sonner';
import { useState } from 'react';
import { TagOptions } from '@/types';
import { createClient } from '@/lib/utils/supabase/client';
import { HeroInput } from '@/components/2.0/Hero/HeroInput';
import InfoInputs from '@/components/2.0/Info/InfoInput';
import Container from '@/components/2.0/Container';

export type RecipeFormValues = z.infer<typeof recipeSchema>;

const RecipeForm: React.FC<{ tagOptions: TagOptions[] }> = ({ tagOptions }) => {
  const [resetKey, setResetKey] = useState<string>('');
  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      instructions: [{ title: '', instructions: [{ instruction: '' }] }],
      ingredients: [{ title: '', ingredients: [{ name: '', quantity: '', unit: '' }] }],
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="gap-y-8 text-black flex items-center flex-col max-w-[890px] mx-auto"
      >
        <HeroInput />
        <Container className="w-full">
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder={`# This is a title \n## This is a subtitle \nThis is a paragraph`}
                    className="bg-transparent border-none placeholder:text-primary text-primary text-xl font-bold"
                    rows={10}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Container>

        <InfoInputs />

        <Ingredients />

        <Instructions form={form} />

        <Button type="submit" className="w-full">
          ADD RECIPE
        </Button>
      </form>
    </Form>
  );
};

export default RecipeForm;
