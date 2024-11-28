import type { ImageProps } from 'next/image';

export const Link = ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => 
  <a href={href} {...props}>{children}</a>;

export const Image = ({ alt = '', ...props }: Omit<ImageProps, 'src'> & { src: string }) =>
  // eslint-disable-next-line @next/next/no-img-element
  <img alt={alt} {...props} />;