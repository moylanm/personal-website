import { render, screen, fireEvent } from '@testing-library/react';
import FilterButtons from '@/components/excerpts/components/filters/FilterButtons';
import type { RenderResult } from '@testing-library/react';

describe('FilterButtons', () => {
  const mockProps = {
    onRandom: jest.fn(),
    onReset: jest.fn(),
  };

  let renderResult: RenderResult;

  beforeEach(() => {
    mockProps.onRandom.mockClear();
    mockProps.onReset.mockClear();
  });

  afterEach(() => {
    if (renderResult) {
      renderResult.unmount();
    }
  });

  it('renders both Random and Reset buttons', () => {
    renderResult = render(<FilterButtons {...mockProps} />);

    expect(screen.getByRole('button', { name: /random/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
  });

  it('calls onRandom when Random button is clicked', () => {
    renderResult = render(<FilterButtons {...mockProps} />);

    const randomButton = screen.getByRole('button', { name: /random/i });
    fireEvent.click(randomButton);

    expect(mockProps.onRandom).toHaveBeenCalledTimes(1);
  });

  it('calls onReset when Reset button is clicked', () => {
    renderResult = render(<FilterButtons {...mockProps} />);

    const resetButton = screen.getByRole('button', { name: /reset/i });
    fireEvent.click(resetButton);

    expect(mockProps.onReset).toHaveBeenCalledTimes(1);
  });

  it('renders buttons with correct variants and sizes', () => {
    renderResult = render(<FilterButtons {...mockProps} />);

    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toHaveAttribute('data-variant', 'outlined');
      expect(button).toHaveAttribute('data-size', 'small');
    });
  });
});
