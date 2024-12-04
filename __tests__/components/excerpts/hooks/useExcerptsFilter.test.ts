import { renderHook, act } from '@testing-library/react';
import useExcerptsFilter from '@/components/excerpts/hooks/useExcerptsFilter';
import { SortDirection } from '@/lib/excerpts/types';
import type { Excerpt } from '@/lib/constants/definitions';
import type { ChangeEvent } from 'react';

describe('useExcerptsFilter', () => {
  const mockExcerpts: Excerpt[] = [
    {
      id: '1',
      body: 'Text 1',
      author: 'Author 1',
      work: 'Work 1',
      createdAt: '2023-01-01T00:00:00Z'
    },
    {
      id: '2',
      body: 'Text 2',
      author: 'Author 1',
      work: 'Work 2',
      createdAt: '2023-01-02T00:00:00Z'
    },
    {
      id: '3',
      body: 'Text 3',
      author: 'Author 2',
      work: 'Work 3',
      createdAt: '2023-01-03T00:00:00Z'
    },
  ];

  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('initializes with correct state', () => {
    const { result } = renderHook(() => useExcerptsFilter(mockExcerpts));

    expect(result.current.state.excerpts).toEqual(mockExcerpts);
    expect(result.current.state.authors).toEqual(['Author 1', 'Author 2']);
    expect(result.current.state.works).toEqual({
      'Author 1': ['Work 1', 'Work 2'],
      'Author 2': ['Work 3']
    });
    expect(result.current.mobileOpen).toBe(false);
  });

  it('toggles mobile drawer', () => {
    const { result } = renderHook(() => useExcerptsFilter(mockExcerpts));

    act(() => {
      result.current.handlers.handleDrawerToggle();
    });

    expect(result.current.mobileOpen).toBe(true);

    act(() => {
      result.current.handlers.handleDrawerToggle();
    });

    expect(result.current.mobileOpen).toBe(false);
  });

  it('handles sort direction change', () => {
    const { result } = renderHook(() => useExcerptsFilter(mockExcerpts));

    act(() => {
      const event: ChangeEvent<HTMLInputElement> = {
        target: { value: SortDirection.Oldest } as HTMLInputElement,
      } as ChangeEvent<HTMLInputElement>;

      result.current.handlers.handleSortChange(event);
    });

    expect(result.current.state.sortDirection).toBe(SortDirection.Oldest);
    expect(result.current.sortedAndFilteredExcerpts).toEqual([...mockExcerpts].reverse());
  });

  it('handles author selection', () => {
    const { result } = renderHook(() => useExcerptsFilter(mockExcerpts));

    act(() => {
      result.current.handlers.handleAuthorChange('Author 1', true);
    });

    expect(result.current.state.selectedAuthors).toContain('Author 1');
    expect(result.current.sortedAndFilteredExcerpts).toEqual(
      mockExcerpts.filter(e => e.author === 'Author 1')
    );
  });

  it('handles work selection', () => {
    const { result } = renderHook(() => useExcerptsFilter(mockExcerpts));
  
    act(() => {
      result.current.handlers.handleWorkChange('Author 1', 'Work 1', true);
    });
  
    expect(result.current.state.selectedWorks['Author 1']).toContain('Work 1');
  
    const expectedExcerpts = mockExcerpts.filter(e => 
      (e.author === 'Author 1' && e.work === 'Work 1') || e.author === 'Author 2'
    );
  
    expect(result.current.sortedAndFilteredExcerpts).toEqual(expectedExcerpts);
  });
  

  it('handles random excerpt selection', () => {
    const { result } = renderHook(() => useExcerptsFilter(mockExcerpts));

    act(() => {
      result.current.handlers.handleRandomClick();
    });

    expect(result.current.state.randomExcerpt).toBeTruthy();
    expect(result.current.sortedAndFilteredExcerpts.length).toBe(1);
  });

  it('handles reset', () => {
    const { result } = renderHook(() => useExcerptsFilter(mockExcerpts));

    // Make some changes first
    act(() => {
      result.current.handlers.handleAuthorChange('Author 1', true);
      result.current.handlers.handleWorkChange('Author 1', 'Work 1', true);
      result.current.handlers.handleRandomClick();
    });

    // Then reset
    act(() => {
      result.current.handlers.handleReset();
    });

    expect(result.current.state.selectedAuthors).toEqual([]);
    expect(result.current.state.selectedWorks).toEqual({});
    expect(result.current.state.randomExcerpt).toBeNull();
    expect(result.current.sortedAndFilteredExcerpts).toEqual(mockExcerpts);
  });

  it('filters excerpts with both author and work selections', () => {
    const { result } = renderHook(() => useExcerptsFilter(mockExcerpts));

    act(() => {
      result.current.handlers.handleAuthorChange('Author 1', true);
      result.current.handlers.handleWorkChange('Author 1', 'Work 1', true);
    });

    expect(result.current.sortedAndFilteredExcerpts).toEqual(
      mockExcerpts.filter(e => e.author === 'Author 1' && e.work === 'Work 1')
    );
  });

  it('handles empty excerpts array', () => {
    const { result } = renderHook(() => useExcerptsFilter([]));

    expect(result.current.state.excerpts).toEqual([]);
    expect(result.current.state.authors).toEqual([]);
    expect(result.current.state.works).toEqual({});

    // Verify random click doesn't crash with empty array
    act(() => {
      result.current.handlers.handleRandomClick();
    });

    expect(result.current.state.randomExcerpt).toBeNull();
  });

  it('maintains sort order when filtering', () => {
    const { result } = renderHook(() => useExcerptsFilter(mockExcerpts));

    act(() => {
      const event: ChangeEvent<HTMLInputElement> = {
        target: { value: SortDirection.Oldest } as HTMLInputElement,
      } as ChangeEvent<HTMLInputElement>;

      result.current.handlers.handleSortChange(event);
    });

    act(() => {
      result.current.handlers.handleAuthorChange('Author 1', true);
    });

    expect(result.current.sortedAndFilteredExcerpts).toEqual(
      [...mockExcerpts]
        .filter(e => e.author === 'Author 1')
        .reverse()
    );
  });
});
