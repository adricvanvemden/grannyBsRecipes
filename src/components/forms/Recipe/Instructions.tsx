import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useArrayForm from '@/lib/hooks/useArrayForm';
import { ArrowDown, ArrowUp, Plus, Trash2 } from 'lucide-react';
import { RecipeFormValues } from './Index';
import { UseFormReturn } from 'react-hook-form';
import React from 'react';
import InstructionsItems from './InstructionsItems';

interface InstructionsProps {
  form: UseFormReturn<RecipeFormValues>;
}

const Instructions: React.FC<InstructionsProps> = ({ form }) => {
  const { fields, addItem, deleteItem, moveItemUp, moveItemDown } = useArrayForm(form, 'instructions');

  return (
    <div className="p-4 bg-black text-primary rounded w-full">
      <FormLabel className="text-2xl">Instructions</FormLabel>
      {fields.map((item, index) => (
        <div key={`${item.id}-${index}`} className="flex flex-col gap-2 border-b border-neutral py-2">
          <div className="grid grid-cols-[24px_1fr_120px] gap-2">
            <span className="h-fit text-center pt-px mt-2 bg-primary text-primary-foreground rounded text-sm aspect-square">
              {index + 1}
            </span>
            <FormField
              control={form.control}
              name={`instructions.${index}.title`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Click to add title..."
                      className="bg-transparent border-none placeholder:text-primary text-primary text-lg font-bold h-fit"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 mt-1">
              <Button
                disabled={index === 0}
                size="icon-md"
                variant="ghost"
                type="button"
                className="p-4 cursor-pointer col-start-1 text-white"
                onClick={() => moveItemUp(index)}
              >
                <ArrowUp size={20} className="shrink-0" />
              </Button>

              <Button
                disabled={index === fields.length - 1}
                size="icon-md"
                variant="ghost"
                type="button"
                className="p-4 cursor-pointer col-start-2 text-white"
                onClick={() => moveItemDown(index)}
              >
                <ArrowDown size={20} className="shrink-0" />
              </Button>

              <Button
                disabled={index === 0}
                size="icon-md"
                variant="ghost"
                type="button"
                className="p-4 cursor-pointer col-start-3 text-white"
                onClick={() => deleteItem(index)}
              >
                <Trash2 size={20} className="shrink-0" />
              </Button>
            </div>
          </div>
          <InstructionsItems form={form} index={index} />
        </div>
      ))}
      <Button
        asChild
        size="sm"
        variant="link"
        className="text-gray cursor-pointer text-xs !pl-0 w-max"
        onClick={() => addItem({ title: '', instructions: [] })}
      >
        <div className="flex gap-2">
          Add list
          <Plus size={14} />
        </div>
      </Button>
    </div>
  );
};

export default Instructions;
