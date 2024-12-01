import { render, screen } from '@testing-library/react';
import NavbarSkeleton from '@/components/main/components/NavbarSkeleton';

describe('NavbarSkeleton', () => {
  describe('Mobile View', () => {
    test('shows correct elements for mobile view', () => {
      render(<NavbarSkeleton />)

      // Check if navigation is present
      expect(screen.getByRole('banner')).toBeInTheDocument();

      // Check containers presence
      expect(screen.getByTestId('mobile-menu-container')).toBeInTheDocument();
      expect(screen.getByTestId('mobile-social-container')).toBeInTheDocument();
      expect(screen.getByTestId('desktop-nav-container')).toBeInTheDocument();
      expect(screen.getByTestId('desktop-social-container')).toBeInTheDocument();

      // Check mobile elements presence
      expect(screen.getByTestId('mobile-menu-skeleton')).toBeInTheDocument();
      expect(screen.getByTestId('mobile-social-skeleton')).toBeInTheDocument();

      // Check desktop elements presence
      const navItems = screen.getAllByTestId(/^nav-item-skeleton-/);
      expect(navItems).toHaveLength(3);

      const socialIcons = screen.getAllByTestId(/^social-icon-skeleton-/);
      expect(socialIcons).toHaveLength(3);

      // Logo should be present
      expect(screen.getByTestId('logo-skeleton')).toBeInTheDocument();
    });
  });

  describe('Desktop View', () => {
    test('shows correct elements for desktop view', () => {
      render(<NavbarSkeleton />)

      // Check if navigation is present
      expect(screen.getByRole('banner')).toBeInTheDocument();

      // Check containers presence
      expect(screen.getByTestId('mobile-menu-container')).toBeInTheDocument();
      expect(screen.getByTestId('mobile-social-container')).toBeInTheDocument();
      expect(screen.getByTestId('desktop-nav-container')).toBeInTheDocument();
      expect(screen.getByTestId('desktop-social-container')).toBeInTheDocument();

      // Check mobile elements presence
      expect(screen.getByTestId('mobile-menu-skeleton')).toBeInTheDocument();
      expect(screen.getByTestId('mobile-social-skeleton')).toBeInTheDocument();

      // Check desktop elements presence
      const navItems = screen.getAllByTestId(/^nav-item-skeleton-/);
      expect(navItems).toHaveLength(3);

      const socialIcons = screen.getAllByTestId(/^social-icon-skeleton-/);
      expect(socialIcons).toHaveLength(3);

      // Logo should be present
      expect(screen.getByTestId('logo-skeleton')).toBeInTheDocument();
    });
  });
});