/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { render, screen, fireEvent } from '@testing-library/react';
import SortControls from '@/components/excerpts/components/filters/SortControls';
import { SortDirection } from '@/lib/excerpts/types';
import type { RenderResult } from '@testing-library/react';

describe('SortControls', () => {
  const mockOnChange = jest.fn();
  let renderResult: RenderResult;

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  afterEach(() => {
    if (renderResult) {
      renderResult.unmount();
    }
  });

  it('renders sort label', () => {
    renderResult = render(
      <SortControls 
        value={SortDirection.Newest} 
        onChange={mockOnChange} 
      />
    );

    expect(screen.getByText('Sort by:')).toBeInTheDocument();
  });

  it('renders both radio options', () => {
    renderResult = render(
      <SortControls 
        value={SortDirection.Newest} 
        onChange={mockOnChange} 
      />
    );

    expect(screen.getByLabelText('Newest')).toBeInTheDocument();
    expect(screen.getByLabelText('Oldest')).toBeInTheDocument();
  });

  it('selects the correct radio button based on value prop', () => {
    renderResult = render(
      <SortControls 
        value={SortDirection.Newest} 
        onChange={mockOnChange} 
      />
    );

    const newestRadio = screen.getByLabelText('Newest') as HTMLInputElement;
    const oldestRadio = screen.getByLabelText('Oldest') as HTMLInputElement;

    expect(newestRadio.checked).toBe(true);
    expect(oldestRadio.checked).toBe(false);
  });

  it('calls onChange when a different option is selected', () => {
    renderResult = render(
      <SortControls 
        value={SortDirection.Newest} 
        onChange={mockOnChange} 
      />
    );

    const oldestRadio = screen.getByLabelText('Oldest');
    fireEvent.click(oldestRadio);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('has correct accessibility attributes', () => {
    renderResult = render(
      <SortControls 
        value={SortDirection.Newest} 
        onChange={mockOnChange} 
      />
    );
  
    const radioGroup = screen.getByRole('radiogroup');
    expect(radioGroup).toHaveAttribute('aria-labelledby', 'sort-by');
    const radioInputs = screen.getAllByRole('radio');
    radioInputs.forEach(radio => {
      expect(radio).toHaveAttribute('name', 'sort-by');
    });
  });
  

  it('updates selection when value prop changes', () => {
    const { rerender } = render(
      <SortControls 
        value={SortDirection.Newest} 
        onChange={mockOnChange} 
      />
    );

    let newestRadio = screen.getByLabelText('Newest') as HTMLInputElement;
    let oldestRadio = screen.getByLabelText('Oldest') as HTMLInputElement;

    expect(newestRadio.checked).toBe(true);
    expect(oldestRadio.checked).toBe(false);

    rerender(
      <SortControls 
        value={SortDirection.Oldest} 
        onChange={mockOnChange} 
      />
    );

    newestRadio = screen.getByLabelText('Newest') as HTMLInputElement;
    oldestRadio = screen.getByLabelText('Oldest') as HTMLInputElement;

    expect(newestRadio.checked).toBe(false);
    expect(oldestRadio.checked).toBe(true);
  });
});
