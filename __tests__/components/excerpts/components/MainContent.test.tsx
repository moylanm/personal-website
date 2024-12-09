import { render, screen } from '@testing-library/react';
import MainContent from '@/components/excerpts/components/MainContent';
import type { RenderResult } from '@testing-library/react';

describe('MainContent', () => {
  let renderResult: RenderResult;

  afterEach(() => {
    if (renderResult) {
      renderResult.unmount();
    }
  });

  it('renders children content', () => {
    const testContent = 'Test Content';
    renderResult = render(
      <MainContent>
        <div>{testContent}</div>
      </MainContent>
    );

    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it('renders multiple children correctly', () => {
    renderResult = render(
      <MainContent>
        <div>First Child</div>
        <div>Second Child</div>
      </MainContent>
    );

    expect(screen.getByText('First Child')).toBeInTheDocument();
    expect(screen.getByText('Second Child')).toBeInTheDocument();
  });

  it('renders with correct main element role', () => {
    renderResult = render(
      <MainContent>
        <div>Content</div>
      </MainContent>
    );

    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
  });
});
