import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useArrayForm from '@/lib/hooks/useArrayForm';
import { ArrowDown, ArrowUp, Minus, Plus, Trash2 } from 'lucide-react';
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
    <div className="flex flex-col gap-4">
      {fields.map((item, index) => (
        <React.Fragment key={`${item.id}-${index}`}>
          <div className="grid grid-cols-[1fr_68px] gap-4">
            <FormField
              control={form.control}
              name={`instructions.${index}.title`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Instruction Set Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3">
              {index > 0 && (
                <Button
                  asChild
                  size="icon-md"
                  variant="link"
                  className="mt-2.5 cursor-pointer"
                  onClick={() => moveItemUp(index)}
                >
                  <ArrowUp size={12} />
                </Button>
              )}

              {index < fields.length - 1 && (
                <Button
                  asChild
                  size="icon-md"
                  variant="link"
                  className="mt-2.5 cursor-pointer"
                  onClick={() => moveItemDown(index)}
                >
                  <ArrowDown size={12} />
                </Button>
              )}

              {index > 0 && (
                <Button
                  asChild
                  size="icon-md"
                  variant="link"
                  className="mt-2.5 cursor-pointer col-start-3"
                  onClick={() => deleteItem(index)}
                >
                  <Trash2 size={12} />
                </Button>
              )}
            </div>
          </div>
          <InstructionsItems form={form} index={index} />
        </React.Fragment>
      ))}
      <Button
        asChild
        size="sm"
        variant="link"
        className="cursor-pointer text-xs !pl-0 w-max -mt-4"
        onClick={() => addItem({ title: '', instructions: [] })}
      >
        <div className="flex">
          <Plus size={14} />
          Add Instruction Set
        </div>
      </Button>
    </div>
  );
};

export default Instructions;
