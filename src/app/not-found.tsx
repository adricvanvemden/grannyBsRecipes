import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[800px] my-12 prose container">
      <h1 className="text-center">404 - Culinary Catastrophe!</h1>

      <p>
        Oops! It seems you&apos;ve stumbled upon a culinary mystery in GrannyB&apos;s kitchen. The page you&apos;re
        looking for has taken an unexpected detour or decided to play hide-and-seek. Fear not, our kitchen detectives
        are on the case to locate it.
      </p>
      <p>
        While we solve this delightful mystery, why not explore other scrumptious offerings on GrannyB&apos;s Recipes?
        There&apos;s always a new flavor waiting to be discovered!
      </p>
      <p>Happy Culinary Exploration!</p>

      <strong>GrannyB&apos;s Recipes Team💜</strong>

      <div className="flex gap-4 my-4 justify-center">
        <Button asChild variant="secondary" className="no-underline w-max">
          <Link href="/account/create">Create Recipe</Link>
        </Button>

        <Button asChild className="no-underline w-max">
          <Link href="/">Return Home</Link>
        </Button>
      </div>

      <Image
        src="/granny-kitty.jpg"
        alt="Cartoon depiction of GrannyB cooking with her cat"
        className="rounded mx-auto my-8"
        width={280}
        height={280}
      />
    </div>
  );
}
