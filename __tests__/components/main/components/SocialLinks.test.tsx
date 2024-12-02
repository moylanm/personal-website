import { render, screen, fireEvent } from '@testing-library/react';
import { SocialLinks } from '@/components/main/components/SocialLinks';
import * as nextMocks from '__mocks__/next-mocks';

export const MOCK_SOCIAL_LINKS = [
  {
    url: 'https://bsky.app/profile/mylesmoylan.net',
    icon: '/bluesky.png',
    alt: 'Bluesky page',
    title: 'Bluesky'
  },
  {
    url: 'https://github.com/moylanm',
    icon: '/github.png',
    alt: 'Github page',
    title: 'Github'
  },
  {
    url: 'https://www.linkedin.com/in/myles-moylan/',
    icon: '/linkedin.png',
    alt: 'LinkedIn page',
    title: 'LinkedIn'
  }
] as const;

jest.mock('next', () => nextMocks);

describe('SocialLinks', () => {
  const mockSocialMenu = {
    anchorEl: null,
    isOpen: false,
    handleOpen: jest.fn(),
    handleClose: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Desktop View', () => {
    beforeEach(() => {
      global.innerWidth = 1024;
      global.dispatchEvent(new Event('resize'));
    });

    it('renders accessible social links', () => {
      render(<SocialLinks socialMenu={mockSocialMenu} />);

      MOCK_SOCIAL_LINKS.forEach(link => {
        const linkElement = screen.getByRole('link', { name: link.alt });
        expect(linkElement).toHaveAttribute('href', link.url);
      });
    });
  });

  describe('Mobile View', () => {
    beforeEach(() => {
      global.innerWidth = 500;
      global.dispatchEvent(new Event('resize'));
    });

    it('renders accessible menu button', () => {
      render(<SocialLinks socialMenu={mockSocialMenu} />);

      const menuButton = screen.getByRole('button', { name: /social links menu/i });
      expect(menuButton).toBeInTheDocument();
    });

    it('opens menu when button is clicked', () => {
      render(<SocialLinks socialMenu={mockSocialMenu} />);

      const menuButton = screen.getByRole('button', { name: /social links menu/i });
      fireEvent.click(menuButton);

      expect(mockSocialMenu.handleOpen).toHaveBeenCalled();
    });

    it('displays accessible menu items when menu is open', () => {
      const openMenu = {
        ...mockSocialMenu,
        isOpen: true,
        anchorEl: document.createElement('button'),
      };

      render(<SocialLinks socialMenu={openMenu} />);

      MOCK_SOCIAL_LINKS.forEach(link => {
        const menuItem = screen.getByRole('menuitem', { name: new RegExp(link.title, 'i') });
        expect(menuItem).toBeInTheDocument();
        expect(menuItem).toHaveAttribute('href', link.url);
      });
    });

    it('closes menu when item is selected', () => {
      const openMenu = {
        ...mockSocialMenu,
        isOpen: true,
        anchorEl: document.createElement('button'),
      };

      render(<SocialLinks socialMenu={openMenu} />);

      const firstMenuItem = screen.getByRole('menuitem', { 
        name: new RegExp(MOCK_SOCIAL_LINKS[0].title, 'i') 
      });
      fireEvent.click(firstMenuItem);

      expect(mockSocialMenu.handleClose).toHaveBeenCalled();
    });
  });
});
