'use client';
import { signOut } from '@/app/login/actions';
import { cn } from '@/lib/utils/utils';
import { ChefHat } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const Profile: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  const [loading, setLoading] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelItemsTabIndex = showPanel ? 0 : -1;

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

  const handleOnClick = () => {
    setShowPanel((prev) => !prev);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleOnClick();
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (panelRef.current && !panelRef.current.contains(event.relatedTarget as Node)) {
      setShowPanel(false);
    }
  };

  return (
    <div className="relative">
      {/* AVATAR */}
      <div
        tabIndex={0}
        onClick={handleOnClick}
        onKeyDown={handleKeyDown}
        className="rounded-full text-white bg-secondary border-2 border-primary size-10 flex justify-center items-center flex-shrink-0 cursor-pointer select-none"
      >
        Av
      </div>

      {/* PANEL */}
      <div
        ref={panelRef}
        onBlur={handleBlur}
        tabIndex={-1}
        className={cn(
          'absolute transition-opacity ease-in-out duration-300 right-0 top-14 bg-gray-darker border border-gray rounded-lg shadow-lg p-4 w-40',
          showPanel ? 'opacity-100' : 'opacity-0'
        )}
      >
        <div className="flex flex-col gap-4">
          <p className="text-primary-foreground font-bold">John Doe</p>
          <div className="border" />
          <Link tabIndex={panelItemsTabIndex} href="/profile" className="text-primary-foreground">
            View Profile
          </Link>
          <div className="border" />

          <button tabIndex={panelItemsTabIndex} onClick={handleSignOut} className="text-primary-foreground text-start">
            {loading ? <ChefHat size="20" className="animate-bounce duration-350 mt-0.5" /> : 'Sign out'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
