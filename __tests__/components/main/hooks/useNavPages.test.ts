jest.mock('next-auth/react', () => ({
  useSession: jest.fn()
}));

import { renderHook } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { useNavPages } from '@/components/main/hooks/useNavPages';
import { PAGES } from '@/lib/constants/navigation';
import type { Session } from 'next-auth';

const mockUseSession = jest.mocked(useSession);

describe('useNavPages', () => {
  const mockUpdate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return loading state and default pages when status is loading', () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: 'loading',
      update: mockUpdate,
    } as ReturnType<typeof useSession>);

    const { result } = renderHook(() => useNavPages());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.navPages).toEqual(PAGES);
  });

  it('should return default pages when user is unauthenticated', () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: 'unauthenticated',
      update: mockUpdate,
    } as ReturnType<typeof useSession>);

    const { result } = renderHook(() => useNavPages());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.navPages).toEqual(PAGES);
  });

  it('should return pages with dashboard when user is authenticated', () => {
    mockUseSession.mockReturnValue({
      data: {
        user: { id: '1' },
        expires: new Date().toISOString(),
      } as Session,
      status: 'authenticated',
      update: mockUpdate,
    } as ReturnType<typeof useSession>);

    const { result } = renderHook(() => useNavPages());

    const expectedPages = [...PAGES, { url: '/dashboard', value: 'dashboard' }];
    expect(result.current.isLoading).toBe(false);
    expect(result.current.navPages).toEqual(expectedPages);
  });

  it('should not include dashboard when session has no user data', () => {
    mockUseSession.mockReturnValue({
      data: {
        expires: new Date().toISOString(),
      } as Session,
      status: 'authenticated',
      update: mockUpdate,
    } as ReturnType<typeof useSession>);

    const { result } = renderHook(() => useNavPages());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.navPages).toEqual(PAGES);
  });
});
