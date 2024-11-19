'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function AuthErrorBoundary({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const handleUnauthorized = (event: Event) => {
      if (event instanceof ErrorEvent && event.error?.message === 'Unauthorized') {
        router.push('/login');
      }
    };

    window.addEventListener('unhandledrejection', handleUnauthorized);
    return () => window.removeEventListener('unhandledrejection', handleUnauthorized);
  }, [router]);

  return <>{children}</>;
}
