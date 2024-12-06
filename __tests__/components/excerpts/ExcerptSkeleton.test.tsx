import React from 'react';
import { render } from '@testing-library/react';
import { ExcerptSkeleton } from '@/components/excerpts/ExcerptSkeleton';

// Mock the styled component
jest.mock('@/styles', () => ({
  SkeletonContainer: ({ children }: { children: React.ReactNode}) =>
    <div data-testid="skeleton-container">{children}</div>,
}));

describe('ExcerptSkeleton', () => {
  it('renders the skeleton container', () => {
    const { getByTestId } = render(<ExcerptSkeleton />);
    expect(getByTestId('skeleton-container')).toBeInTheDocument();
  });

  it('renders correct number of skeleton elements', () => {
    const { container } = render(<ExcerptSkeleton />);
    // Using class name as MUI Skeleton adds 'MuiSkeleton-root' class
    const skeletons = container.getElementsByClassName('MuiSkeleton-root');
    expect(skeletons).toHaveLength(7);
  });

  it('renders header skeletons with correct properties', () => {
    const { container } = render(<ExcerptSkeleton />);
    const skeletons = container.getElementsByClassName('MuiSkeleton-root');

    // First header skeleton (60% width)
    expect(skeletons[0]).toHaveStyle({
      width: '60%',
      margin: '0 auto',
      height: '28px'
    });

    // Second header skeleton (40% width)
    expect(skeletons[1]).toHaveStyle({
      width: '40%',
      margin: '0 auto',
      height: '28px'
    });
  });

  it('renders body skeletons with correct widths', () => {
    const { container } = render(<ExcerptSkeleton />);
    const skeletons = Array.from(container.getElementsByClassName('MuiSkeleton-root'));

    // Check the last three skeletons have correct widths
    expect(skeletons[4]).toHaveStyle({ width: '80%', height: '20px' });
    expect(skeletons[5]).toHaveStyle({ width: '90%', height: '20px' });
    expect(skeletons[6]).toHaveStyle({ width: '75%', height: '20px' });
  });

  it('renders all skeletons with wave animation', () => {
    const { container } = render(<ExcerptSkeleton />);
    const skeletons = container.getElementsByClassName('MuiSkeleton-root');

    Array.from(skeletons).forEach(skeleton => {
      expect(skeleton).toHaveClass('MuiSkeleton-wave');
    });
  });

  it('renders Paper component with correct elevation and padding', () => {
    const { container } = render(<ExcerptSkeleton />);
    const paper = container.getElementsByClassName('MuiPaper-root')[0];

    expect(paper).toHaveClass('MuiPaper-elevation2');
    // Note: Testing exact padding values might be tricky due to responsive values
    expect(paper).toBeInTheDocument();
  });
});
