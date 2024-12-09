import { render, screen, fireEvent } from '@testing-library/react';
import MobileAppBar from '@/components/excerpts/components/MobileAppBar';
import type { RenderResult } from '@testing-library/react';

describe('MobileAppBar', () => {
  const mockOnDrawerToggle = jest.fn();
  let renderResult: RenderResult;

  beforeEach(() => {
    mockOnDrawerToggle.mockClear();
  });

  it('renders the Filters title', () => {
    renderResult = render(<MobileAppBar onDrawerToggle={mockOnDrawerToggle} />);
    const titleElement = screen.getByText('Filters');
    expect(titleElement).toBeInTheDocument();
  });

  it('calls onDrawerToggle when filter button is clicked', () => {
    renderResult = render(<MobileAppBar onDrawerToggle={mockOnDrawerToggle} />);

    const filterButton = screen.getByRole('button', { 
      name: /open filters/i 
    });

    fireEvent.click(filterButton);

    expect(mockOnDrawerToggle).toHaveBeenCalledTimes(1);
  });

  it('renders filter button with correct accessibility label', () => {
    renderResult = render(<MobileAppBar onDrawerToggle={mockOnDrawerToggle} />);

    const filterButton = screen.getByRole('button', { 
      name: /open filters/i 
    });

    expect(filterButton).toBeInTheDocument();
  });

  afterEach(() => {
    if (renderResult) {
      renderResult.unmount();
    }
  });
});
