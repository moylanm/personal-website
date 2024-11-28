export const Box = ({ children }: React.PropsWithChildren) => <div>{children}</div>;

export const Menu = ({ children, open }: React.PropsWithChildren<{ open: boolean }>) => 
  open ? <div data-testid="menu">{children}</div> : null;

export const MenuItem = ({ children, onClick }: React.PropsWithChildren<{ onClick?: () => void }>) => 
  <button onClick={onClick}>{children}</button>;

export const Typography = ({ children, ...props }: React.PropsWithChildren) => 
  <span {...props}>{children}</span>;