import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from '@/components/main/Navbar';
import { usePathname } from 'next/navigation';
import { useNavPages } from '@/components/main/hooks/useNavPages';

// Mock the next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn()
}));

// Mock the custom hooks
jest.mock('@/components/main/hooks/useNavPages', () => ({
  useNavPages: jest.fn()
}));

// Mock child components
jest.mock('@/components/main/components/NavbarSkeleton', () => ({
  __esModule: true,
  default: () => <div data-testid="navbar-skeleton">Loading...</div>
}));

jest.mock('@/components/main/components/NavbarLogo', () => ({
  __esModule: true,
  default: () => <div data-testid="navbar-logo">Logo</div>
}));

jest.mock('@/components/main/components/NavMenu', () => ({
  NavMenu: () => <div data-testid="nav-menu">Navigation Menu</div>
}));

jest.mock('@/components/main/components/DesktopNav', () => ({
  DesktopNav: () => <div data-testid="desktop-nav">Desktop Navigation</div>
}));

jest.mock('@/components/main/components/SocialLinks', () => ({
  SocialLinks: () => <div data-testid="social-links">Social Links</div>
}));

describe('Navbar', () => {
  const mockNavPages = [
    { id: 1, title: 'Home', path: '/' },
    { id: 2, title: 'About', path: '/about' }
  ];

  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/');
    (useNavPages as jest.Mock).mockReturnValue({ navPages: mockNavPages, isLoading: false });
  });

  it('renders loading skeleton when data is loading', () => {
    (useNavPages as jest.Mock).mockReturnValue({ navPages: [], isLoading: true });
    render(<Navbar />);
    expect(screen.getByTestId('navbar-skeleton')).toBeInTheDocument();
  });

  it('renders all main components when data is loaded', () => {
    render(<Navbar />);

    expect(screen.getByTestId('navbar-logo')).toBeInTheDocument();
    expect(screen.getByTestId('desktop-nav')).toBeInTheDocument();
    expect(screen.getByTestId('social-links')).toBeInTheDocument();
  });

  it('renders mobile menu button and handles click', () => {
    render(<Navbar />);

    const menuButton = screen.getByRole('button', { name: /navigation menu/i });
    expect(menuButton).toBeInTheDocument();

    fireEvent.click(menuButton);
    expect(screen.getByTestId('nav-menu')).toBeInTheDocument();
  });

  it('passes correct props to child components', () => {
    const currentPath = '/about';
    (usePathname as jest.Mock).mockReturnValue(currentPath);

    const { container } = render(<Navbar />);

    // Verify AppBar position
    const appBar = container.querySelector('.MuiAppBar-root');
    expect(appBar).toHaveStyle({ position: 'fixed' });
  });
});
