import type { Metadata } from 'next';
import { Grid2 } from '@mui/material';
import { AboutCard, AboutContainer, AboutGrid2 } from '@/styles';

export const metadata: Metadata = {
  title: 'About',
  description: 'A curated collection of meaningful excerpts, insights, and wisdom to provide encouragement and consolation during life\'s challenges',
  openGraph: {
    title: 'About',
    description: 'A thoughtfully curated collection of timeless wisdom, insights, and encouraging words from history\'s most sympathetic minds',
    type: 'website',
    images: [
      {
        url: '/og-image-about.png',
        width: 1200,
        height: 630,
        alt: 'Curated Wisdom Collection'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | Curated Wisdom Collection',
    description: 'A thoughtfully curated collection of timeless wisdom, insights, and encouraging words from history\'s most sympathetic minds',
    images: ['/og-image-about.png']
  },
  alternates: {
    canonical: 'https://mylesmoylan.net/about'
  },
  keywords: [
    'wisdom collection',
    'life advice',
    'philosophical insights',
    'curated excerpts',
    'meaningful quotes',
    'life guidance',
    'personal growth',
    'encouragement',
    'consolation',
    'human condition',
    'life challenges'
  ]
};

export default function Page() {
	return (
		<AboutContainer>
			<AboutGrid2 container spacing={0}>
				<Grid2>
					<AboutCard>
						As anyone knows, life isn&apos;t easy, and it can be hard to find encouraging words which are also substantial and meaningful enough to pick one up during dark, difficult times. Fortunately for us we are the progeny of many wise and sympathetic people who left behind little gems of advice, insight, and consolation for the trials and tribulations which are an inherent part of the human condition. That being said, I am, I suppose, somewhat of a collector of these gems, and I built this website so that I could share them with others.
					</AboutCard>
				</Grid2>
			</AboutGrid2>
		</AboutContainer>
	);
}
