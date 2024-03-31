import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useArrayForm from '@/lib/hooks/useArrayForm';
import { ArrowDown, ArrowUp, Trash2, Plus } from 'lucide-react';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { RecipeFormValues } from './Index';
import IngredientsItems from './IngredientsItems';
import { kalam } from '@/app/fonts';

interface IngredientsProps {
  form: UseFormReturn<RecipeFormValues>;
}

const Ingredients: React.FC<IngredientsProps> = ({ form }) => {
  const { fields, addItem, deleteItem, moveItemUp, moveItemDown } = useArrayForm(form, `ingredients`);

  return (
    <div className="flex flex-col gap-4 bg-secondary/20 px-4 pt-2 pb-1">
      <FormLabel>Ingredients</FormLabel>
      {fields.map((item, index) => (
        <div key={`${item.id}-${index}`} className="flex flex-col gap-4 border-b border-neutral pb-4">
          <div className="grid grid-cols-[30px_1fr_120px] gap-4">
            <span className="h-fit mt-2 text-center bg-secondary text-primary-foreground rounded">{index + 1}</span>
            <FormField
              control={form.control}
              name={`ingredients.${index}.title`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Ingredient Set Title" {...field} className={kalam.className} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-3 mt-1">
              <Button
                disabled={index === 0}
                size="icon-md"
                variant="outline"
                className="p-4 cursor-pointer"
                onClick={() => moveItemUp(index)}
              >
                <ArrowUp size={20} className="shrink-0" />
              </Button>

              <Button
                disabled={index === fields.length - 1}
                size="icon-md"
                variant="outline"
                className="p-4 cursor-pointer col-start-2"
                onClick={() => moveItemDown(index)}
              >
                <ArrowDown size={20} className="shrink-0" />
              </Button>

              <Button
                disabled={index === 0}
                size="icon-md"
                variant="outline"
                className="p-4 cursor-pointer col-start-3"
                onClick={() => deleteItem(index)}
              >
                <Trash2 size={20} className="shrink-0" />
              </Button>
            </div>
          </div>
          <IngredientsItems form={form} index={index} />
        </div>
      ))}
      <Button
        asChild
        size="sm"
        variant="link"
        className="text-white cursor-pointer text-xs !pl-0 w-max -mt-3"
        onClick={() => addItem({ title: '', ingredients: [{ name: '', quantity: 0, metric: '' }] })}
      >
        <div className="flex">
          <Plus size={14} />
          Add Ingredient Set
        </div>
      </Button>
    </div>
  );
};

export default Ingredients;
