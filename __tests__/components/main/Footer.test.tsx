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
    expect(screen.getByText(/2024/)).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /next\.js/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://nextjs.org/');
  });
});
