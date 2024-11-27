import { renderHook, act } from '@testing-library/react';
import { useMenu } from '@/components/main/hooks/useMenu';

describe('useMenu', () => {
  it('should initialize with closed state', () => {
    const { result } = renderHook(() => useMenu());

    expect(result.current.isOpen).toBe(false);
    expect(result.current.anchorEl).toBeNull();
  });

  it('should open menu when handleOpen is called', () => {
    const { result } = renderHook(() => useMenu());
    const button = document.createElement('button');

    const mockEvent = { 
      currentTarget: button 
    } as unknown as React.MouseEvent<HTMLElement>;

    act(() => {
      result.current.handleOpen(mockEvent);
    });

    expect(result.current.isOpen).toBe(true);
    expect(result.current.anchorEl).toBe(button);
  });

  it('should close menu when handleClose is called', () => {
    const { result } = renderHook(() => useMenu());
    const button = document.createElement('button');

    const mockEvent = { 
      currentTarget: button 
    } as unknown as React.MouseEvent<HTMLElement>;

    act(() => {
      result.current.handleOpen(mockEvent);
    });

    act(() => {
      result.current.handleClose();
    });

    expect(result.current.isOpen).toBe(false);
    expect(result.current.anchorEl).toBeNull();
  });
});
