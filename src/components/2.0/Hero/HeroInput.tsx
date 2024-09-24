import HeroBody from './components/HeroBody';
import HeroHeader from './components/HeroHeader';
import { BackButton } from '@/components/BackButton';
import HeroDivider from './components/HeroDivider';
import Container from '../Container';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';
import { fluidTypography } from '../Typography/helper';
import { Textarea } from '@/components/ui/textarea';

export const HeroInput = () => {
  const formContext = useFormContext();

  return (
    <Container className="bg-black rounded-lg text-gray p-6 max-w-[890px] w-full drop-shadow-lg">
      <HeroHeader>
        <BackButton />
      </HeroHeader>
      <HeroDivider />
      <HeroBody>
        <FormField
          control={formContext.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  style={{ fontSize: fluidTypography(24, 48, 320, 1200) }}
                  className="bg-transparent border-none placeholder:text-primary text-primary text-xl font-bold h-fit"
                  placeholder="Click here to add a title..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={formContext.control}
          name="shortDescription"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  className="bg-transparent border-none placeholder:text-gray text-gray text-base h-fit"
                  placeholder="Click here to add a description..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <HeroTags {...props} /> */}
      </HeroBody>
    </Container>
  );
};
