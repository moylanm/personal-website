/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { render, screen, fireEvent } from '@testing-library/react';
import AuthorItem from '@/components/excerpts/components/filters/AuthorItem';
import type { RenderResult } from '@testing-library/react';

describe('AuthorItem', () => {
  const mockProps = {
    author: 'Test Author',
    works: ['Work 1', 'Work 2', 'Work 3'],
    isSelected: false,
    selectedWorks: [] as string[],
    onAuthorChange: jest.fn(),
    onWorkChange: jest.fn(),
  };

  let renderResult: RenderResult;

  beforeEach(() => {
    mockProps.onAuthorChange.mockClear();
    mockProps.onWorkChange.mockClear();
  });

  afterEach(() => {
    if (renderResult) {
      renderResult.unmount();
    }
  });

  it('renders author checkbox with correct label', () => {
    renderResult = render(<AuthorItem {...mockProps} />);
    expect(screen.getByLabelText('Test Author')).toBeInTheDocument();
  });

  it('calls onAuthorChange when author checkbox is clicked', () => {
    renderResult = render(<AuthorItem {...mockProps} />);
    const authorCheckbox = screen.getByLabelText('Test Author');

    fireEvent.click(authorCheckbox);

    expect(mockProps.onAuthorChange).toHaveBeenCalledWith('Test Author', true);
  });

  it('does not show works list when author is not selected', () => {
    renderResult = render(<AuthorItem {...mockProps} />);

    mockProps.works.forEach(work => {
      expect(screen.queryByLabelText(work)).not.toBeInTheDocument();
    });
  });

  it('shows works list when author is selected', () => {
    renderResult = render(<AuthorItem {...mockProps} isSelected={true} />);

    mockProps.works.forEach(work => {
      expect(screen.getByLabelText(work)).toBeInTheDocument();
    });
  });

  it('calls onWorkChange when work checkbox is clicked', () => {
    renderResult = render(<AuthorItem {...mockProps} isSelected={true} />);
    const workCheckbox = screen.getByLabelText('Work 1');

    fireEvent.click(workCheckbox);

    expect(mockProps.onWorkChange).toHaveBeenCalledWith('Test Author', 'Work 1', true);
  });

  it('correctly shows selected works', () => {
    renderResult = render(
      <AuthorItem 
        {...mockProps} 
        isSelected={true} 
        selectedWorks={['Work 1']} 
      />
    );

    const work1Checkbox = screen.getByLabelText('Work 1') as HTMLInputElement;
    const work2Checkbox = screen.getByLabelText('Work 2') as HTMLInputElement;

    expect(work1Checkbox.checked).toBe(true);
    expect(work2Checkbox.checked).toBe(false);
  });
});
