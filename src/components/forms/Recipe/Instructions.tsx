import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useArrayForm from '@/lib/hooks/useArrayForm';
import { ArrowDown, ArrowUp, Minus, Plus, Trash2 } from 'lucide-react';

const Instructions: React.FC<{ form: any }> = ({ form }) => {
  const { fields, addItem, deleteItem, moveItemUp, moveItemDown } = useArrayForm(form, 'ingredients');

  return (
    <div className="flex flex-col gap-4">
      {fields.map((item, index) => (
        <div key={item.id} className="grid grid-cols-[1fr_68px] gap-4">
          <FormField
            control={form.control}
            name={`instructions[${index}].instruction`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Instruction" {...field} />
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
      ))}
      <Button
        asChild
        size="sm"
        variant="link"
        className="cursor-pointer text-xs !pl-0 w-max -mt-4"
        onClick={() => addItem({ name: '', quantity: '', metric: '' })}
      >
        <div className="flex">
          <Plus size={14} />
          Add Instruction
        </div>
      </Button>
    </div>
  );
};

export default Instructions;
