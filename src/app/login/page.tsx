'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { z } from 'zod';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { login } from '../login/actions'; // Make sure this function exists
import { useRef, useState } from 'react';
import { ChefHat } from 'lucide-react';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type LoginFormValues = z.infer<typeof LoginSchema>;

function LoginForm() {
  const captcha = useRef<null | HCaptcha>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (values: LoginFormValues) => {
    const result = LoginSchema.safeParse(values);

    if (!result.success) {
      console.log({ success: false, error: result.error.format() });
      return;
    }

    const formData = new FormData();
    formData.append('email', result.data.email);
    formData.append('password', result.data.password);
    formData.append('captchaToken', captchaToken || '');

    setLoading(true);
    login(formData).then((result) => {
      setLoading(false);
      setError(result?.error);
      captcha.current?.resetCaptcha();
      setCaptchaToken(null);
    });
  };

  return (
    <div className="relative flex flex-col h-screen md:h-[calc(100vh_-_64px)]">
      <div className="container max-w-lg z-10 my-20 rounded-md backdrop-filter backdrop-blur-md bg-secondary/30">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="py-6">
            <fieldset disabled={loading} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Email</FormLabel>
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
                    <FormLabel className="text-white">Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && <FormDescription className="text-red-500">{error}</FormDescription>}

              <Button type="submit" className="w-full">
                {loading ? <ChefHat size="20" className="animate-bounce duration-350 mt-0.5" /> : 'Log in'}
              </Button>
              <div className="flex justify-center">
                <HCaptcha
                  ref={captcha}
                  sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || ''}
                  onVerify={(token) => {
                    setCaptchaToken(token);
                  }}
                />
              </div>
            </fieldset>
          </form>
        </Form>
      </div>
      <div className="absolute inset-0 w-full h-full bg-[url('/granny-kitty.jpg')] bg-right bg-cover flex -z-0" />
    </div>
  );
}

export default LoginForm;
