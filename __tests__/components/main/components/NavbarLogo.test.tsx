import { render, screen } from '@testing-library/react';
import { Image } from '@/__mocks__/next-mocks';
import NavbarLogo from '@/components/main/components/NavbarLogo';

jest.mock('next/image', () => Image);

describe('NavbarLogo', () => {
  test('renders logo image with correct attributes', () => {
    render(<NavbarLogo />);

    const logoImage = screen.getByAltText('website logo');

    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', '/yin-yang.png');
    expect(logoImage).toHaveAttribute('width', '32');
    expect(logoImage).toHaveAttribute('height', '32');
    expect(logoImage).toHaveClass('md:none');
  });
});