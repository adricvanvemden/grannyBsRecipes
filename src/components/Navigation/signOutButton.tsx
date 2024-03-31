'use client';
import { signOut } from '@/app/login/actions';
import { CookingPot } from 'lucide-react';
import { useState } from 'react';

const SignOutButton: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    const result = await signOut();

    if (!result?.error) {
      setLoading(false);
      onClick && onClick();
    } else {
      console.log(result.error);
    }
  };

  return (
    <button onClick={handleSignOut} className="lg:px-4 text-primary-foreground w-max">
      {loading ? <CookingPot size="20" className="animate-bounce duration-350 mt-0.5" /> : 'Sign out'}
    </button>
  );
};

export default SignOutButton;
