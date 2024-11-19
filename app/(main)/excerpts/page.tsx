import type { Metadata } from 'next';
import { allExcerpts } from '@/lib/data';
import { Excerpts } from '@/components';

export const metadata: Metadata = {
  title: 'Excerpts',
  description: 'Browse a curated collection of literary excerpts from various authors and works.',
  openGraph: {
    title: 'Literary Excerpts',
    description: 'Browse a curated collection of literary excerpts from various authors and works.',
    type: 'website',
    images: [
      {
        url: '/og-image-excerpts.png',
        width: 1200,
        height: 630,
        alt: 'Literary Excerpts Collection'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Literary Excerpts',
    description: 'Browse a curated collection of literary excerpts from various authors and works.',
    images: ['/og-image-excerpts.png'],
  },
  keywords: ['literature', 'excerpts', 'quotes', 'authors', 'books', 'reading'],
  alternates: {
    canonical: '/excerpts'
  }
};

export default async function ExcerptsPage() {
  const excerpts = await allExcerpts();
  return <Excerpts excerpts={excerpts} />;
}
