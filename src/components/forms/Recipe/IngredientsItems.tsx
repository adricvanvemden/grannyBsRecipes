import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useArrayForm from '@/lib/hooks/useArrayForm';
import { ArrowDown, ArrowUp, Trash2, Plus } from 'lucide-react';
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { RecipeFormValues } from './Index';

interface IngredientsProps {
  form: UseFormReturn<RecipeFormValues>;
  index: number;
}

const IngredientsItems: React.FC<IngredientsProps> = ({ form, index }) => {
  const { fields, addItem, deleteItem, moveItemUp, moveItemDown } = useArrayForm(
    form,
    `ingredients.${index}.ingredients`
  );

  return (
    <div className="flex flex-col gap-4 bg-gray-300 p-4">
      {fields.map((item, _index) => (
        <div key={item.id} className="grid grid-cols-[1fr_100px_100px_68px] gap-4">
          <FormField
            control={form.control}
            name={`ingredients.${index}.ingredients.${_index}.name`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Ingredient Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`ingredients.${index}.ingredients.${_index}.quantity`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Quantity"
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
            name={`ingredients.${index}.ingredients.${_index}.metric`}
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Metric" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ml">ml</SelectItem>
                    <SelectItem value="tbsp">tbsp</SelectItem>
                    <SelectItem value="tsp">tsp</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3">
            {_index > 0 && (
              <Button
                asChild
                size="icon-md"
                variant="link"
                className="mt-2.5 cursor-pointer"
                onClick={() => moveItemUp(_index)}
              >
                <ArrowUp size={12} />
              </Button>
            )}

            {_index < fields.length - 1 && (
              <Button
                asChild
                size="icon-md"
                variant="link"
                className="mt-2.5 cursor-pointer col-start-2"
                onClick={() => moveItemDown(_index)}
              >
                <ArrowDown size={12} />
              </Button>
            )}
            {_index > 0 && (
              <Button
                asChild
                size="icon-md"
                variant="link"
                className="mt-2.5 cursor-pointer col-start-3"
                onClick={() => deleteItem(_index)}
              >
                <Trash2 size={12} />
              </Button>
            )}
          </div>
        </div>
      ))}

      <Button
        asChild
        size="sm"
        variant="link"
        className="cursor-pointer text-xs !pl-0 w-max -mt-4"
        onClick={() => addItem({ name: '', quantity: 0, metric: '' })}
      >
        <div className="flex">
          <Plus size={14} />
          Add Ingredient
        </div>
      </Button>
    </div>
  );
};

export default IngredientsItems;
