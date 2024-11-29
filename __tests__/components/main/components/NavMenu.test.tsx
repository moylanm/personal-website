import { render, screen, fireEvent } from '@testing-library/react';
import { NavMenu } from '@/components/main/components/NavMenu';
import type { NavPage } from '@/lib/constants/navigation';

describe('NavMenu', () => {
  const mockPages: NavPage[] = [
    { value: 'home', url: '/' },
    { value: 'about', url: '/about' },
    { value: 'contact', url: '/contact' },
  ];
  
  const mockOnClose = jest.fn();

  it('renders menu when open', () => {
    render(
      <NavMenu
        anchorEl={document.createElement('div')}
        isOpen={true}
        onClose={mockOnClose}
        pages={mockPages}
        pathname="/"
      />
    );

    // Check if the menu is open
    expect(screen.getByRole('menu')).toBeVisible();
  });

  it('does not render menu when closed', () => {
    render(
      <NavMenu
        anchorEl={null}
        isOpen={false}
        onClose={mockOnClose}
        pages={mockPages}
        pathname="/"
      />
    );

    // Check if the menu is not in the document
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('renders correct number of menu items', () => {
    render(
      <NavMenu
        anchorEl={document.createElement('div')}
        isOpen={true}
        onClose={mockOnClose}
        pages={mockPages}
        pathname="/"
      />
    );

    // Check if the correct number of menu items are rendered
    const menuItems = screen.getAllByRole('menuitem');
    expect(menuItems).toHaveLength(mockPages.length);
  });

  it('highlights the active menu item based on pathname', () => {
    render(
      <NavMenu
        anchorEl={document.createElement('div')}
        isOpen={true}
        onClose={mockOnClose}
        pages={mockPages}
        pathname="/about"
      />
    );

    // Check if the correct menu item is highlighted
    const activeMenuItem = screen.getByText('about');
    expect(activeMenuItem).toHaveStyle({backgroundColor: 'rgb(48 53 57)'});
  });

  it('calls onClose when a menu item is clicked', () => {
    render(
      <NavMenu
        anchorEl={document.createElement('div')}
        isOpen={true}
        onClose={mockOnClose}
        pages={mockPages}
        pathname="/"
      />
    );

    // Simulate clicking a menu item
    const menuItem = screen.getByText('home');
    fireEvent.click(menuItem);

    // Check if onClose is called
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
