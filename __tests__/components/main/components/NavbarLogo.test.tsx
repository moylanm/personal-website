import { render, screen } from '@testing-library/react';
import type { ImageProps } from 'next/image';
import NavbarLogo from '@/components/main/components/NavbarLogo';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ alt = '', ...props }: Omit<ImageProps, 'src'> & { src: string }) =>
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} {...props} />
}));

describe('NavbarLogo', () => {
  it('renders logo image with correct attributes', () => {
    render(<NavbarLogo />);

    const logoImage = screen.getByAltText('website logo');

    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', '/yin-yang.png');
    expect(logoImage).toHaveAttribute('width', '32');
    expect(logoImage).toHaveAttribute('height', '32');
    expect(logoImage).toHaveClass('md:none');
  });
});