export const Link = ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => 
  <a href={href} {...props}>{children}</a>