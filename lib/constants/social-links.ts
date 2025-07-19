export interface SocialLink {
  url: string;
  icon: string;
  alt: string;
  title: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    url: 'https://bsky.app/profile/mylesmoylan.net',
    icon: '/bluesky.png',
    alt: 'Bluesky page',
    title: 'Bluesky'
  },
  {
    url: 'https://www.linkedin.com/in/myles-moylan/',
    icon: '/linkedin.png',
    alt: 'LinkedIn page',
    title: 'LinkedIn'
  },
  {
    url: 'https://github.com/moylanm',
    icon: '/github.png',
    alt: 'Github page',
    title: 'Github'
  }
];
