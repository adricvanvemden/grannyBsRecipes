import { useFormContext } from 'react-hook-form';
import Container from '../Container';
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface InfoProps {
  prepTime: number;
  cookTime: number;
  serves: number;
  nutrients: {
    calories: number;
    carbohydrates: number;
    fat: number;
    protein: number;
  };
}

const InfoInputs = () => {
  const formContext = useFormContext();
  const { control } = formContext;

  return (
    <Container className="not-prose flex-col bg-black rounded py-4 px-6 text-gray text-center">
      <Container className="flex flex-row gap-8 mb-4 flex-wrap">
        <FormField
          control={control}
          name="cookingTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cook time</FormLabel>
              <FormControl>
                <Input
                  placeholder="..."
                  className="bg-transparent border-none h-fit w-20 text-center"
                  type="number"
                  min={0}
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormDescription>minutes</FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="preparationTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prep time</FormLabel>
              <FormControl>
                <Input
                  placeholder="..."
                  className="bg-transparent border-none h-fit w-20 text-center"
                  type="number"
                  min={0}
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormDescription>minutes</FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="portions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Serves</FormLabel>
              <FormControl>
                <Input
                  placeholder="..."
                  className="bg-transparent border-none h-fit w-20 text-center"
                  type="number"
                  min={0}
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="nutrients.protein"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Protein</FormLabel>
              <FormControl>
                <Input
                  placeholder="..."
                  className="bg-transparent border-none h-fit w-20 text-center"
                  type="number"
                  min={0}
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="nutrients.fat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fat</FormLabel>
              <FormControl>
                <Input
                  placeholder="..."
                  className="bg-transparent border-none h-fit w-20 text-center"
                  type="number"
                  min={0}
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="nutrients.carbohydrates"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Carbohydrates</FormLabel>
              <FormControl>
                <Input
                  placeholder="..."
                  className="bg-transparent border-none h-fit w-20 text-center"
                  type="number"
                  min={0}
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="nutrients.calories"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Calories</FormLabel>
              <FormControl>
                <Input
                  placeholder="..."
                  className="bg-transparent border-none h-fit w-20 text-center"
                  type="number"
                  min={0}
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </Container>
    </Container>
  );
};

export default InfoInputs;
