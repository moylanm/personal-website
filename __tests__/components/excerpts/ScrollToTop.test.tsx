import { render, screen, fireEvent } from '@testing-library/react';
import ScrollToTop from '@/components/excerpts/ScrollToTop';

describe('ScrollToTop Component', () => {
  const originalWindow = global.window;

  beforeEach(() => {
    // Mock window.scroll
    global.window.scroll = jest.fn();

    // Mock scrollY
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      value: 0
    });
  });

  afterEach(() => {
    global.window = originalWindow;
  });

  it('should not show button when scroll position is below threshold', () => {
    render(<ScrollToTop />);

    const button = screen.queryByRole('button');
    expect(button).not.toBeInTheDocument();
  });

  it('should show button when scroll position is above threshold', () => {
    // Set scrollY above threshold
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      value: 1000
    });

    render(<ScrollToTop />);

    // Trigger scroll event
    fireEvent.scroll(window);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should scroll to top when button is clicked', () => {
    // Set scrollY above threshold
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      value: 1000
    });

    render(<ScrollToTop />);

    // Trigger scroll event to show button
    fireEvent.scroll(window);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(window.scroll).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth'
    });
  });

  it('should hide button when scrolling below threshold', () => {
    // Initially set scrollY above threshold
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      value: 1000
    });

    render(<ScrollToTop />);

    // Trigger scroll event to show button
    fireEvent.scroll(window);

    // Verify button is shown
    expect(screen.getByRole('button')).toBeInTheDocument();

    // Change scrollY to below threshold
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      value: 500
    });

    // Trigger scroll event
    fireEvent.scroll(window);

    // Verify button is hidden
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should remove scroll event listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    const { unmount } = render(<ScrollToTop />);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  });
});
