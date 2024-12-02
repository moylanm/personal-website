'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ErrorWithMessage {
  message: string;
}

const isErrorWithMessage = (error: unknown): error is ErrorWithMessage => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as ErrorWithMessage).message === 'string'
  );
};

export function AuthErrorBoundary({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const handleUnauthorized = (event: Event) => {
      if (event instanceof ErrorEvent && isErrorWithMessage(event.error) && event.error.message === 'Unauthorized') {
        router.push('/login');
      }
    };

    window.addEventListener('unhandledrejection', handleUnauthorized);
    return () => window.removeEventListener('unhandledrejection', handleUnauthorized);
  }, [router]);

  return <>{children}</>;
}
