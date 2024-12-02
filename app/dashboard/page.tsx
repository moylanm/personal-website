'use client'

import { fetchCsrfToken } from '@/lib/dashboard/features/csrf/csrfSlice';
import { useAppDispatch } from '@/lib/dashboard/hooks';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function Page() {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  useEffect(() => {
    void dispatch(fetchCsrfToken());
  }, [dispatch]);

  return <h2>Welcome {session?.user?.name}...</h2>;
}