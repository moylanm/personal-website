import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/main/Footer';

describe('Footer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-03-03'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('displays the correct content and link', () => {
    render(<Footer />);

    expect(screen.getByText(/powered by/i)).toBeInTheDocument();

    const yearText = screen.getByText(/2024/);
    expect(yearText).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /next\.js/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://nextjs.org/');
  });

  it('displays the footer text with correct year', () => {
    render(<Footer />);

    const footerText = screen.getByText((content) => {
      return content.includes('Powered by') && 
             content.includes('in') && 
             content.includes('2024');
    });
    expect(footerText).toBeInTheDocument();
  });
});
