'use client'

import { useSession } from 'next-auth/react';

export default function Page() {
  const { data: session } = useSession();

  return <h2>Welcome {session?.user?.name}...</h2>;
}