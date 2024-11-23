import { ExcerptContainer } from '@/styles';
import { Suspense } from 'react';
import Loading from './loading';

export default function ExcerptLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ExcerptContainer maxWidth='md'>
      <Suspense fallback={<Loading />}>
        {children}
      </Suspense>
    </ExcerptContainer>
  );
}