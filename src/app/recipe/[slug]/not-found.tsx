import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[800px] my-12 prose container">
      <h1 className="text-center">404 - Recipe not found...</h1>

      <p>
        Whoops! Looks like that recipe got lost in GrannyB&apos;s kitchen—or maybe she just hasn&apos;t tried it yet.
        Our culinary wizards are brewing up some magic to unveil it soon. In the meantime, feel free to explore other
        tasty adventures on GrannyB&apos;s menu!
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
