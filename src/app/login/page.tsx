'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { set, z } from 'zod';
import Link from 'next/link';
import { login } from '../login/actions'; // Make sure this function exists
import { useState } from 'react';
import { CookingPot } from 'lucide-react';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type LoginFormValues = z.infer<typeof LoginSchema>;

function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (values: LoginFormValues) => {
    const result = LoginSchema.safeParse(values);

    if (!result.success) {
      console.log({ success: false, error: result.error.format() });
      return;
    }

    console.log({ success: true, data: result.data });

    const formData = new FormData();
    formData.append('email', result.data.email);
    formData.append('password', result.data.password);

    setLoading(true);
    login(formData).then((result) => {
      setLoading(false);
      setError(result?.error);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="container my-8 py-4 border rounded">
        <fieldset disabled={loading} className="space-y-4 ">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && <FormDescription className="text-red-500">{error}</FormDescription>}

          <Button type="submit">
            {loading ? <CookingPot size="20" className="animate-bounce duration-350 mt-0.5" /> : 'Log in'}
          </Button>
        </fieldset>
      </form>
    </Form>
  );
}

export default LoginForm;
