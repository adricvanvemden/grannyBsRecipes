import { UseFormReturn } from 'react-hook-form';
import { RecipeFormValues } from './Index';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface TimesProps {
  form: UseFormReturn<RecipeFormValues>;
}

const Times: React.FC<TimesProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
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
            <FormDescription className="text-secondary">in minutes</FormDescription>
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
            <FormDescription className="text-secondary">in minutes</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default Times;
