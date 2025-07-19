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
            Life is rarely simple. In its darker moments, we often reach for words—words that can offer not just comfort, but real meaning. Yet it&apos;s not always easy to find language that speaks honestly to the struggles of the human soul.
            <br />
            <br />
            Fortunately, we are not the first to wrestle with life&apos;s questions. Across time and cultures, thoughtful individuals have left behind fragments of wisdom—small gems tucked into pages of books. These works remind us that we are not alone, that the human experience—however fractured or uncertain—has been deeply explored by those who came before us.
            <br />
            <br />
            This website is a home for some of those fragments. Over the course of my own soul-search—a journey shaped by curiosity, loss, growth, and wonder—I&apos;ve gathered passages that resonated deeply. They offered me insight, challenged my assumptions, and, at times, helped me to keep going. I share them here not as answers, but as companions for the road.
            <br />
            <br />
            If you find something here that moves you, gives you pause, or helps you feel understood, then this space has done what it was meant to do.
					</AboutCard>
				</Grid2>
			</AboutGrid2>
		</AboutContainer>
	);
}
