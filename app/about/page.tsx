import type { Metadata } from 'next';
import { Grid2 } from '@mui/material';
import { AboutCard, AboutContainer, AboutGrid2 } from '@/styles';

export const metadata: Metadata = {
  title: 'About',
  description: 'From Navy veteran to software developer - Personal journey and philosophy of Myles Moylan',
  openGraph: {
    title: 'About Myles Moylan',
    description: 'From Navy veteran to software developer - Personal journey and philosophy of Myles Moylan',
    type: 'profile',
    images: [
      {
        url: '/og-image-about.png',
        width: 1200,
        height: 630,
        alt: 'About Myles Moylan'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Myles Moylan',
    description: 'From Navy veteran to software developer - Personal journey and philosophy of Myles Moylan',
    images: ['/og-image-about.png']
  },
  alternates: {
    canonical: 'https://mylesmoylan.net/about'
  },
  keywords: [
    'Navy veteran',
    'computer science',
    'software developer',
    'existentialism',
    'personal journey',
    'philosophy',
    'self-taught programmer'
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

