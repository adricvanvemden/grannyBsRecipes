import Link from 'next/link';
import Image from 'next/image';

function Logo() {
  return (
    <Link href="/recipes">
      <Image src="/logo.svg" alt="logo" width={100} height={40} />
    </Link>
  );
}

export default Logo;
