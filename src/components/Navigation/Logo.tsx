import Link from 'next/link';
import Image from 'next/image';

function Logo() {
  return (
    <Link href="/recipes">
      <Image src="/logo.svg" alt="logo" width={140} height={100} />
    </Link>
  );
}

export default Logo;
