export const NavbarButton = ({ children, href, style }: { 
  children: React.ReactNode; 
  href?: string;
  style?: React.CSSProperties;
}) => (
  <button style={style}>
    <a href={href}>{children}</a>
  </button>
)