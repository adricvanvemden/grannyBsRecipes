import { UseFormReturn } from 'react-hook-form';
import { RecipeFormValues } from './Index';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { kalam } from '@/app/fonts';

interface NutrientsProps {
  form: UseFormReturn<RecipeFormValues>;
}

const Nutrients: React.FC<NutrientsProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <FormField
        control={form.control}
        name="nutrients.protein"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Protein</FormLabel>
            <FormControl>
              <Input
                placeholder="69"
                type="number"
                min={0}
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
                className={kalam.className}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="nutrients.fat"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Fat</FormLabel>
            <FormControl>
              <Input
                placeholder="420"
                type="number"
                min={0}
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
                className={kalam.className}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="nutrients.carbohydrates"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Carbohydrates</FormLabel>
            <FormControl>
              <Input
                placeholder="20"
                type="number"
                min={0}
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
                className={kalam.className}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="nutrients.calories"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Calories</FormLabel>
            <FormControl>
              <Input
                placeholder="1337"
                type="number"
                min={0}
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
                className={kalam.className}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default Nutrients;
