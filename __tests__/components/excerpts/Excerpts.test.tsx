import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';
import { Excerpts } from '@/components/excerpts/Excerpts';
import useExcerptsFilter from '@/components/excerpts/hooks/useExcerptsFilter';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { Excerpt } from '@/lib/constants/definitions';

interface FilterContentProps {
  variant: 'mobile' | 'desktop';
  handlers: {
    handleSomeAction: () => void;
  };
}

interface MobileAppBarProps {
  onDrawerToggle: () => void;
}

interface NavigationProps {
  children: React.ReactNode;
  mobileOpen: boolean;
  onDrawerClose: () => void;
  isMobile: boolean;
}

interface MainContentProps {
  children: React.ReactNode;
}

interface ListProps {
  excerpts: Excerpt[];
}

// Mock all the imported components
jest.mock('@/components/excerpts/components/filters/FilterContent', () => ({
  __esModule: true,
  default: ({ variant, handlers }: FilterContentProps) => (
    <div data-testid="filter-content" data-variant={variant}>
      <button onClick={handlers.handleSomeAction}>Filter Action</button>
    </div>
  )
}));

jest.mock('@/components/excerpts/components/MobileAppBar', () => ({
  __esModule: true,
  default: ({ onDrawerToggle }: MobileAppBarProps) => (
    <div data-testid="mobile-app-bar">
      <button onClick={onDrawerToggle}>Toggle Drawer</button>
    </div>
  )
}));

jest.mock('@/components/excerpts/components/Navigation', () => ({
  __esModule: true,
  default: ({ children, mobileOpen, onDrawerClose, isMobile }: NavigationProps) => (
    <div 
      data-testid="navigation"
      data-mobile-open={mobileOpen}
      data-is-mobile={isMobile}
    >
      <button onClick={onDrawerClose}>Close Drawer</button>
      {children}
    </div>
  )
}));

jest.mock('@/components/excerpts/components/MainContent', () => ({
  __esModule: true,
  default: ({ children }: MainContentProps) => <div data-testid="main-content">{children}</div>
}));

jest.mock('@/components/excerpts/List', () => ({
  __esModule: true,
  default: ({ excerpts }: ListProps) => (
    <div data-testid="excerpts-list">
      {excerpts.map(excerpt => (
        <div key={excerpt.id} data-testid="excerpt-item">
          {excerpt.author} - {excerpt.work}
        </div>
      ))}
    </div>
  )
}));

jest.mock('@/components/excerpts/ScrollToTop', () => ({
  __esModule: true,
  default: () => <div data-testid="scroll-to-top" />
}));

// Mock the custom hook
jest.mock('@/components/excerpts/hooks/useExcerptsFilter', () => ({
  __esModule: true,
  default: jest.fn()
}));

// Mock useMediaQuery
jest.mock('@mui/material/useMediaQuery', () => ({
  __esModule: true,
  default: jest.fn()
}));

describe('Excerpts', () => {
  const mockExcerpts: Excerpt[] = [
    { 
      id: '1', 
      author: 'Author 1', 
      work: 'Work 1', 
      body: 'Body 1', 
      createdAt: '2024-01-01'
    },
    { 
      id: '2', 
      author: 'Author 2', 
      work: 'Work 2', 
      body: 'Body 2', 
      createdAt: '2024-01-02'
    }
  ];

  const mockHandlers = {
    handleDrawerToggle: jest.fn(),
    handleSomeAction: jest.fn()
  };

  interface FilterState {
    resetKey: string;
  }

  const mockState: FilterState = {
    resetKey: 'test-key',
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useExcerptsFilter as jest.Mock).mockReturnValue({
      state: mockState,
      mobileOpen: false,
      handlers: mockHandlers,
      sortedAndFilteredExcerpts: mockExcerpts
    });
  });

  it('renders desktop version correctly', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(false);

    render(
      <ThemeProvider theme={createTheme()}>
        <Excerpts excerpts={mockExcerpts} />
      </ThemeProvider>
    );

    expect(screen.queryByTestId('mobile-app-bar')).not.toBeInTheDocument();
    expect(screen.getByTestId('navigation')).toBeInTheDocument();
    expect(screen.getByTestId('filter-content')).toHaveAttribute('data-variant', 'desktop');
    expect(screen.getByTestId('main-content')).toBeInTheDocument();
    expect(screen.getByTestId('scroll-to-top')).toBeInTheDocument();
  });

  it('renders mobile version correctly', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(true);

    render(
      <ThemeProvider theme={createTheme()}>
        <Excerpts excerpts={mockExcerpts} />
      </ThemeProvider>
    );

    expect(screen.getByTestId('mobile-app-bar')).toBeInTheDocument();
    expect(screen.getByTestId('filter-content')).toHaveAttribute('data-variant', 'mobile');
  });

  it('handles drawer toggle correctly', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(true);

    render(
      <ThemeProvider theme={createTheme()}>
        <Excerpts excerpts={mockExcerpts} />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText('Toggle Drawer'));
    expect(mockHandlers.handleDrawerToggle).toHaveBeenCalled();
  });

  it('renders correct number of excerpts', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(false);

    render(
      <ThemeProvider theme={createTheme()}>
        <Excerpts excerpts={mockExcerpts} />
      </ThemeProvider>
    );

    const excerptItems = screen.getAllByTestId('excerpt-item');
    expect(excerptItems).toHaveLength(mockExcerpts.length);
  });

  it('updates when filter state changes', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(false);

    const { rerender } = render(
      <ThemeProvider theme={createTheme()}>
        <Excerpts excerpts={mockExcerpts} />
      </ThemeProvider>
    );

    (useExcerptsFilter as jest.Mock).mockReturnValue({
      state: { ...mockState, resetKey: 'new-key' },
      mobileOpen: false,
      handlers: mockHandlers,
      sortedAndFilteredExcerpts: [mockExcerpts[0]]
    });

    rerender(
      <ThemeProvider theme={createTheme()}>
        <Excerpts excerpts={mockExcerpts} />
      </ThemeProvider>
    );

    const excerptItems = screen.getAllByTestId('excerpt-item');
    expect(excerptItems).toHaveLength(1);
  });
});
