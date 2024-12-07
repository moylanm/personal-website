import { render } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';
import Navigation from '@/components/excerpts/components/Navigation';
import type { ReactElement } from 'react';
import { DRAWER_WIDTH } from '@/components/excerpts/components/constants/styles';

describe('Navigation', () => {
  interface DefaultProps {
    mobileOpen: boolean;
    onDrawerClose: () => void;
    isMobile: boolean;
    children: ReactElement;
  }

  const defaultProps: DefaultProps = {
    mobileOpen: false,
    onDrawerClose: jest.fn(),
    isMobile: false,
    children: <div>Navigation Content</div>
  };

  it('renders desktop view with correct styles when not mobile', () => {
    const { container } = render(<Navigation {...defaultProps} />);

    const nav = container.firstChild as HTMLElement;
    const desktopBox = nav.firstChild as HTMLElement;

    expect(nav.tagName.toLowerCase()).toBe('nav');
    expect(desktopBox).toHaveStyle({
      display: 'block',
      width: `${DRAWER_WIDTH}px`
    });
    expect(container.querySelector('.MuiDrawer-root')).not.toBeInTheDocument();
  });

  it('renders mobile drawer when in mobile mode and open', () => {
    render(
      <Navigation 
        {...defaultProps} 
        isMobile={true} 
        mobileOpen={true}
      />
    );

    const drawer = document.querySelector('.MuiDrawer-root');
    expect(drawer).toBeInTheDocument();
    expect(drawer).toHaveClass('MuiDrawer-root');
  });

  it('does not render drawer when mobile but drawer is closed', () => {
    const { container } = render(
      <Navigation 
        {...defaultProps} 
        isMobile={true} 
        mobileOpen={false}
      />
    );

    expect(container.querySelector('.MuiDrawer-root')).not.toBeInTheDocument();
  });

  it('calls onDrawerClose when mobile drawer backdrop is clicked', () => {
    render(
      <Navigation 
        {...defaultProps} 
        isMobile={true} 
        mobileOpen={true}
      />
    );

    const backdrop = document.querySelector('.MuiBackdrop-root');
    if (!backdrop) throw new Error('Backdrop not found');

    backdrop.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(defaultProps.onDrawerClose).toHaveBeenCalledTimes(1);
  });

  it('maintains memo functionality with same props', () => {
    const { container, rerender }: RenderResult = render(<Navigation {...defaultProps} />);
    const firstRender = container.firstChild;

    rerender(<Navigation {...defaultProps} />);
    const secondRender = container.firstChild;

    expect(firstRender).toBe(secondRender);
  });

  it('renders different content when props change', () => {
    const { container, rerender } = render(<Navigation {...defaultProps} />);

    // Initially should have desktop box but no drawer
    expect(document.querySelector('.MuiDrawer-root')).not.toBeInTheDocument();
    expect(container.querySelector('.MuiBox-root')).toBeInTheDocument();

    // After rerender with mobile props, should have drawer
    rerender(<Navigation {...defaultProps} isMobile={true} mobileOpen={true} />);

    expect(document.querySelector('.MuiDrawer-root')).toBeInTheDocument();
  });


  it('renders children in both mobile and desktop views', () => {
    const testContent = 'Test Navigation Content';

    // Test desktop view
    const { rerender } = render(
      <Navigation {...defaultProps}>
        <div>{testContent}</div>
      </Navigation>
    );

    // In desktop view, content should be in the Box
    const desktopBox = document.querySelector('.MuiBox-root');
    expect(desktopBox).toHaveTextContent(testContent);

    // Test mobile view with drawer open
    rerender(
      <Navigation 
        {...defaultProps} 
        isMobile={true} 
        mobileOpen={true}
      >
        <div>{testContent}</div>
      </Navigation>
    );

    // In mobile view, content should be in the drawer
    const drawer = document.querySelector('.MuiDrawer-paper');
    expect(drawer).toHaveTextContent(testContent);
  });
});
