import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SideNav } from '@/components/dashboard/SideNav';
import { signOut } from 'next-auth/react';

jest.mock('next-auth/react', () => ({
  signOut: jest.fn()
}));

jest.mock('@/components/dashboard/components/NavLinks', () => {
  return function MockNavLinks() {
    return <nav>Navigation Links</nav>;
  };
});

describe('SideNav', () => {
  it('renders navigation and sign out button', () => {
    render(<SideNav />);

    expect(screen.getByRole('navigation')).toBeInTheDocument();

    // Find button by its contained text instead of accessible name
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
    expect(screen.getByTestId('PowerSettingsNewOutlinedIcon')).toBeInTheDocument();
  });

  it('handles sign out when button is clicked', async () => {
    render(<SideNav />);

    const signOutElement = screen.getByText('Sign Out');
    const signOutButton = signOutElement.closest('button');

    // Type guard to ensure button exists
    if (!signOutButton) {
      throw new Error('Sign Out button not found');
    }

    fireEvent.click(signOutButton);

    await waitFor(() => {
      expect(signOut).toHaveBeenCalledWith({
        redirectTo: '/'
      });
    });
  });
});
