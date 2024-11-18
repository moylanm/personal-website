export interface SocialLink {
  url: string;
  icon: string;
  alt: string;
  title: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    url: 'https://bsky.app/profile/moylanm.bsky.social',
    icon: '/bluesky.png',
    alt: 'Bluesky page',
    title: 'Bluesky'
  },
  {
    url: 'https://github.com/moylanm',
    icon: '/github.png',
    alt: 'Github page',
    title: 'Github'
  },
  {
    url: 'https://www.linkedin.com/in/myles-moylan/',
    icon: '/linkedin.png',
    alt: 'LinkedIn page',
    title: 'LinkedIn'
  }
];
