import type { NavPage } from '@/lib/constants/navigation';
import { render, screen } from '@testing-library/react';
import { DesktopNav } from '@/components/main/components/DesktopNav';

jest.mock('@mui/material', () => ({
  __esModule: true,
  Box: ({ children }: React.PropsWithChildren) => <div>{children}</div>,
  Menu: ({ children, open }: React.PropsWithChildren<{ open: boolean }>) => 
    open ? <div data-testid="menu">{children}</div> : null,
  MenuItem: ({ children, onClick }: React.PropsWithChildren<{ onClick?: () => void }>) => 
    <button onClick={onClick}>{children}</button>,
  Typography: ({ children, ...props }: React.PropsWithChildren) => 
    <span {...props}>{children}</span>
}));

jest.mock('next/link', () => ({
  __esModule: true,
  Link: ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => 
    <a href={href} {...props}>{children}</a>
}));

jest.mock('@/styles', () => ({
  __esModule: true,
  NavbarButton:({ children, href, style }: { 
    children: React.ReactNode; 
    href?: string;
    style?: React.CSSProperties;
  }) => (
    <button style={style}>
      <a href={href}>{children}</a>
    </button>
  ) 
}));

describe('DesktopNav', () => {
  const mockPages: NavPage[] = [
    { value: 'Home', url: '/' },
    { value: 'About', url: '/about' },
    { value: 'Contact', url: '/contact' }
  ];

  it('renders all navigation links', () => {
    render(<DesktopNav pages={mockPages} pathname="/" />);

    mockPages.forEach((page) => {
      // Test for the presence of links by their accessible name
      const link = screen.getByRole('link', { name: page.value });
      expect(link).toHaveAttribute('href', page.url);
    });
  });

  it('indicates active page', () => {
    const activePath = '/about';
    render(<DesktopNav pages={mockPages} pathname={activePath} />);

    mockPages.forEach((page) => {
      const button = screen.getByRole('button', { name: page.value });
      if (page.url === activePath) {
        expect(button).toHaveStyle({ backgroundColor: '#303539' });
      } else {
        expect(button).not.toHaveStyle({ backgroundColor: '#303539' });
      }
    });
  });

  it('renders correct number of navigation items', () => {
    render(<DesktopNav pages={mockPages} pathname="/" />);
    const navItems = screen.getAllByRole('button');
    expect(navItems).toHaveLength(mockPages.length);
  });
});
