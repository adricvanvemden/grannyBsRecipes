import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useArrayForm from '@/lib/hooks/useArrayForm';
import { ArrowDown, ArrowUp, Minus, Plus, Trash2 } from 'lucide-react';
import { RecipeFormValues } from './Index';
import { UseFormReturn } from 'react-hook-form';

interface InstructionsItemsProps {
  form: UseFormReturn<RecipeFormValues>;
  index: number;
}

const InstructionsItems: React.FC<InstructionsItemsProps> = ({ form, index }) => {
  const { fields, addItem, deleteItem, moveItemUp, moveItemDown } = useArrayForm(
    form,
    `instructions.${index}.instructions`
  );

  return (
    <div className="flex flex-col gap-4 bg-secondary/30 rounded p-4 pb-1">
      {fields.map((item, _index) => (
        <div key={item.id} className="grid grid-cols-[30px_1fr_120px] gap-4">
          <span className="mt-2 h-fit text-center bg-secondary text-primary-foreground rounded">{_index + 1}</span>
          <FormField
            control={form.control}
            name={`instructions.${index}.instructions.${_index}.instruction`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Instruction" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-3 mt-1">
            <Button
              disabled={_index === 0}
              size="icon-md"
              variant="outline"
              className="p-4 cursor-pointer"
              onClick={() => moveItemUp(_index)}
            >
              <ArrowUp size={20} className="shrink-0" />
            </Button>

            <Button
              disabled={_index === fields.length - 1}
              size="icon-md"
              variant="outline"
              className="p-4 cursor-pointer"
              onClick={() => moveItemDown(_index)}
            >
              <ArrowDown size={20} className="shrink-0" />
            </Button>

            <Button
              disabled={_index === 0}
              size="icon-md"
              variant="outline"
              className="p-4 cursor-pointer col-start-3"
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
        className="text-white cursor-pointer text-xs !pl-0 w-max -mt-3"
        onClick={() => addItem({ instruction: '' })}
      >
        <div className="flex">
          <Plus size={14} />
          Add Instruction
        </div>
      </Button>
    </div>
  );
};

export default InstructionsItems;
