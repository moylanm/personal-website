import { ExcerptCard } from '@/app/ui/style';
import { CardContent, Container } from '@mui/material';
import { Suspense } from 'react';
import Loading from './loading';

export default function ExcerptLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
      <Container maxWidth='md'>
        <ExcerptCard>
          <CardContent>
            <Suspense fallback={<Loading />}>
              {children}
            </Suspense>
          </CardContent>
        </ExcerptCard>
      </Container>
  );
}