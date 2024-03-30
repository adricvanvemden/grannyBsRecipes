import { redirect } from 'next/navigation';
import { createClient } from '@/lib/utils/supabase/server';
import Link from 'next/link';

async function Account() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/login');
  }

  return (
    <>
      <p>Hello {data.user.email}</p>
      <Link href="/recipe/create">Create Recipe</Link>
    </>
  );
}

export default Account;
