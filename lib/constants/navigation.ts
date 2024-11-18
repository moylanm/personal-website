export interface NavPage {
  url: string;
  value: string;
}

export const PAGES: NavPage[] = [
  { url: '/', value: 'home' },
  { url: '/excerpts', value: 'excerpts' },
  { url: '/about', value: 'about' }
];
