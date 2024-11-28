import * as muiMocks from '@/__mocks__/mui-mocks';
import { Link } from '@/__mocks__/next-mocks';
import { NavbarButton } from '@/__mocks__/custom-mocks';
import type { NavPage } from '@/lib/constants/navigation';
import { render, screen } from '@testing-library/react';
import { DesktopNav } from '@/components/main/components/DesktopNav';

jest.mock('@mui/material', () => muiMocks);
jest.mock('next/link', () => Link);
jest.mock('@/styles', () => ({
  NavbarButton
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
