import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useArrayForm from '@/lib/hooks/useArrayForm';
import { ArrowDown, ArrowUp, Trash2, Plus } from 'lucide-react';
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface IngredientsProps {
  index: number;
}

const IngredientsItems: React.FC<IngredientsProps> = ({ index }) => {
  const formContext = useFormContext();
  const { fields, addItem, deleteItem, moveItemUp, moveItemDown } = useArrayForm(
    formContext,
    `ingredients.${index}.ingredients`
  );
  const { control } = formContext;

  return (
    <div className="flex flex-col gap-4 rounded p-2 pb-1">
      {fields.map((item, _index) => (
        <div key={item.id} className="grid grid-cols-[24px_1fr_100px_100px_120px] gap-2">
          <span className="h-fit text-center pt-px mt-1.5 bg-primary/50 text-primary-foreground rounded text-sm aspect-square">
            {_index + 1}
          </span>
          <FormField
            control={control}
            name={`ingredients.${index}.ingredients.${_index}.name`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Click to add ingredient..."
                    className="bg-transparent border-none font-bold h-fit text-gray placeholder:text-gray"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name={`ingredients.${index}.ingredients.${_index}.quantity`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="quantity..."
                    className="bg-transparent border-none font-bold h-fit text-gray placeholder:text-gray"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`ingredients.${index}.ingredients.${_index}.unit`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="unit..."
                    className="bg-transparent border-none font-bold h-fit text-gray placeholder:text-gray"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 mt-1">
            <Button
              disabled={_index === 0}
              size="icon-md"
              variant="ghost"
              type="button"
              className="p-4 cursor-pointer text-white"
              onClick={() => moveItemUp(_index)}
            >
              <ArrowUp size={20} className="shrink-0" />
            </Button>

            <Button
              disabled={_index === fields.length - 1}
              size="icon-md"
              variant="ghost"
              type="button"
              className="p-4 cursor-pointer col-start-2 text-white"
              onClick={() => moveItemDown(_index)}
            >
              <ArrowDown size={20} className="shrink-0" />
            </Button>

            <Button
              disabled={_index === 0}
              size="icon-md"
              variant="ghost"
              type="button"
              className="p-4 cursor-pointer col-start-3 text-white"
              onClick={() => deleteItem(_index)}
            >
              <Trash2 size={20} className="shrink-0" />
            </Button>
          </div>
        </div>
      ))}

      <Button
        asChild
        size="sm"
        variant="link"
        className="text-gray cursor-pointer text-xs !pl-0 w-max -mt-3"
        onClick={() => addItem({ name: '', quantity: '', unit: '' })}
      >
        <div className="flex gap-2">
          Add Ingredient
          <Plus size={14} />
        </div>
      </Button>
    </div>
  );
};

export default IngredientsItems;
