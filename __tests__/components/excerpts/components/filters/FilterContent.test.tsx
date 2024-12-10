import { render, screen, fireEvent } from '@testing-library/react';
import FilterContent from '@/components/excerpts/components/filters/FilterContent';
import { SortDirection, type AppState } from '@/lib/excerpts/types';
import type { RenderResult } from '@testing-library/react';

describe('FilterContent', () => {
  const mockState: AppState = {
    authors: ['Author 1', 'Author 2'],
    works: {
      'Author 1': ['Work 1', 'Work 2'],
      'Author 2': ['Work 3']
    },
    selectedAuthors: ['Author 1'],
    selectedWorks: {
      'Author 1': ['Work 1']
    },
    sortDirection: SortDirection.Newest,
    excerpts: [],
    randomExcerpt: null,
    resetKey: 0
  };

  const mockHandlers = {
    handleSortChange: jest.fn(),
    handleAuthorChange: jest.fn(),
    handleWorkChange: jest.fn(),
    handleRandomClick: jest.fn(),
    handleReset: jest.fn()
  };

  let renderResult: RenderResult;

  beforeEach(() => {
    Object.values(mockHandlers).forEach(handler => handler.mockClear());
  });

  afterEach(() => {
    if (renderResult) {
      renderResult.unmount();
    }
  });

  describe('Mobile variant', () => {
    it('renders sort controls and filter buttons', () => {
      renderResult = render(
        <FilterContent 
          variant="mobile" 
          state={mockState} 
          handlers={mockHandlers} 
        />
      );

      expect(screen.getByRole('radiogroup')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /random/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
    });

    it('renders authors list with correct authors', () => {
      renderResult = render(
        <FilterContent 
          variant="mobile" 
          state={mockState} 
          handlers={mockHandlers} 
        />
      );

      expect(screen.getByText('Author 1')).toBeInTheDocument();
      expect(screen.getByText('Author 2')).toBeInTheDocument();
    });

    it('shows works for selected authors', () => {
      renderResult = render(
        <FilterContent 
          variant="mobile" 
          state={mockState} 
          handlers={mockHandlers} 
        />
      );

      expect(screen.getByText('Work 1')).toBeInTheDocument();
      expect(screen.getByText('Work 2')).toBeInTheDocument();
    });
  });

  describe('Desktop variant', () => {
    it('renders sort controls and filter buttons', () => {
      renderResult = render(
        <FilterContent 
          variant="desktop" 
          state={mockState} 
          handlers={mockHandlers} 
        />
      );

      expect(screen.getByRole('radiogroup')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /random/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
    });

    it('renders authors list with correct authors', () => {
      renderResult = render(
        <FilterContent 
          variant="desktop" 
          state={mockState} 
          handlers={mockHandlers} 
        />
      );

      expect(screen.getByText('Author 1')).toBeInTheDocument();
      expect(screen.getByText('Author 2')).toBeInTheDocument();
    });
  });

  describe('Interaction handlers', () => {
    it('calls handleSortChange when sort direction is changed', () => {
      renderResult = render(
        <FilterContent 
          variant="desktop" 
          state={mockState} 
          handlers={mockHandlers} 
        />
      );

      const radioButton = screen.getByRole('radio', { name: new RegExp(SortDirection.Oldest, 'i') });
      fireEvent.click(radioButton);

      expect(mockHandlers.handleSortChange).toHaveBeenCalled();
    });

    it('calls handleRandomClick when Random button is clicked', () => {
      renderResult = render(
        <FilterContent 
          variant="desktop" 
          state={mockState} 
          handlers={mockHandlers} 
        />
      );

      const randomButton = screen.getByRole('button', { name: /random/i });
      fireEvent.click(randomButton);

      expect(mockHandlers.handleRandomClick).toHaveBeenCalled();
    });

    it('calls handleReset when Reset button is clicked', () => {
      renderResult = render(
        <FilterContent 
          variant="desktop" 
          state={mockState} 
          handlers={mockHandlers} 
        />
      );

      const resetButton = screen.getByRole('button', { name: /reset/i });
      fireEvent.click(resetButton);

      expect(mockHandlers.handleReset).toHaveBeenCalled();
    });

    it('calls handleAuthorChange when author checkbox is clicked', () => {
      renderResult = render(
        <FilterContent 
          variant="desktop" 
          state={mockState} 
          handlers={mockHandlers} 
        />
      );

      const authorCheckbox = screen.getByRole('checkbox', { name: 'Author 2' });
      fireEvent.click(authorCheckbox);

      expect(mockHandlers.handleAuthorChange).toHaveBeenCalledWith('Author 2', true);
    });

    it('calls handleWorkChange when work checkbox is clicked', () => {
      renderResult = render(
        <FilterContent 
          variant="desktop" 
          state={mockState} 
          handlers={mockHandlers} 
        />
      );

      const workCheckbox = screen.getByRole('checkbox', { name: 'Work 1' });
      fireEvent.click(workCheckbox);

      expect(mockHandlers.handleWorkChange).toHaveBeenCalledWith('Author 1', 'Work 1', false);
    });
  });
});
