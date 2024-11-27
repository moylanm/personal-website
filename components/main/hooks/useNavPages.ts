import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { PAGES, type NavPage } from '@/lib/constants/navigation';

export const useNavPages = () => {
  const { data: session, status } = useSession();
  const [navPages, setNavPages] = useState<NavPage[]>(PAGES);

  useEffect(() => {
    if (status === 'loading') return;

    const updatedPages = status === 'authenticated' && session?.user
      ? [...PAGES, { url: '/dashboard', value: 'dashboard' }]
      : [...PAGES];

    setNavPages(updatedPages);
  }, [status, session]);

  return { navPages, isLoading: status === 'loading' };
};