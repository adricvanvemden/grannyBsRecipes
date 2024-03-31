import type { Metadata } from "next";
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import Navigation from '@/components/Navigation';
import { inter } from './fonts';
import { cn } from '@/lib/utils/utils';

export const metadata: Metadata = {
  title: "GrannyB's Recipes",
  description: "A collection of GrannyB's recipes. Enjoy!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn('', inter.className)}>
        <Navigation />
        <main> {children} </main>
        <Toaster />
      </body>
    </html>
  );
}
