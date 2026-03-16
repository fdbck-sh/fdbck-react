import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { YesNoQuestion } from '../questions/YesNoQuestion';
import { SingleChoiceQuestion } from '../questions/SingleChoiceQuestion';
import { MultipleChoiceQuestion } from '../questions/MultipleChoiceQuestion';
import { RatingQuestion } from '../questions/RatingQuestion';

describe('YesNoQuestion', () => {
  it('renders two options', () => {
    const onSubmit = vi.fn();
    render(<YesNoQuestion options={['Yes', 'No']} disabled={false} onSubmit={onSubmit} />);
    expect(screen.getByText('Yes')).toBeDefined();
    expect(screen.getByText('No')).toBeDefined();
  });

  it('calls onSubmit immediately on click', () => {
    const onSubmit = vi.fn();
    render(<YesNoQuestion options={['Yes', 'No']} disabled={false} onSubmit={onSubmit} />);
    fireEvent.click(screen.getByText('Yes'));
    expect(onSubmit).toHaveBeenCalledWith('Yes');
  });

  it('disables buttons when disabled', () => {
    const onSubmit = vi.fn();
    render(<YesNoQuestion options={['Yes', 'No']} disabled={true} onSubmit={onSubmit} />);
    fireEvent.click(screen.getByText('Yes'));
    expect(onSubmit).not.toHaveBeenCalled();
  });
});

describe('SingleChoiceQuestion', () => {
  it('renders all options with radio dots', () => {
    const onSubmit = vi.fn();
    render(<SingleChoiceQuestion options={['A', 'B', 'C']} disabled={false} onSubmit={onSubmit} />);
    expect(screen.getByText('A')).toBeDefined();
    expect(screen.getByText('B')).toBeDefined();
    expect(screen.getByText('C')).toBeDefined();
  });

  it('calls onSubmit immediately on click', () => {
    const onSubmit = vi.fn();
    render(<SingleChoiceQuestion options={['A', 'B']} disabled={false} onSubmit={onSubmit} />);
    fireEvent.click(screen.getByText('A'));
    expect(onSubmit).toHaveBeenCalledWith('A');
  });
});

describe('MultipleChoiceQuestion', () => {
  const locale = {
    submit: 'Submit', poweredBy: 'Powered by', loading: 'Loading…',
    errorTitle: 'Error',
    errorMessage: 'Failed.', retry: 'Retry', close: 'Close',
  };

  it('renders options with submit button', () => {
    const onSubmit = vi.fn();
    render(<MultipleChoiceQuestion options={['A', 'B', 'C']} disabled={false} locale={locale} onSubmit={onSubmit} />);
    expect(screen.getByText('Submit')).toBeDefined();
  });

  it('submit button is disabled when nothing selected', () => {
    const onSubmit = vi.fn();
    render(<MultipleChoiceQuestion options={['A', 'B']} disabled={false} locale={locale} onSubmit={onSubmit} />);
    const btn = screen.getByText('Submit');
    expect((btn as HTMLButtonElement).disabled).toBe(true);
  });

  it('requires explicit submit button click', () => {
    const onSubmit = vi.fn();
    render(<MultipleChoiceQuestion options={['A', 'B']} disabled={false} locale={locale} onSubmit={onSubmit} />);

    fireEvent.click(screen.getByText('A'));
    expect(onSubmit).not.toHaveBeenCalled();

    fireEvent.click(screen.getByText('Submit'));
    expect(onSubmit).toHaveBeenCalledWith(['A']);
  });

  it('allows multiple selections', () => {
    const onSubmit = vi.fn();
    render(<MultipleChoiceQuestion options={['A', 'B', 'C']} disabled={false} locale={locale} onSubmit={onSubmit} />);

    fireEvent.click(screen.getByText('A'));
    fireEvent.click(screen.getByText('C'));
    fireEvent.click(screen.getByText('Submit'));
    expect(onSubmit).toHaveBeenCalledWith(['A', 'C']);
  });

  it('toggles selection off', () => {
    const onSubmit = vi.fn();
    render(<MultipleChoiceQuestion options={['A', 'B']} disabled={false} locale={locale} onSubmit={onSubmit} />);

    fireEvent.click(screen.getByText('A'));
    fireEvent.click(screen.getByText('A'));

    const btn = screen.getByText('Submit');
    expect((btn as HTMLButtonElement).disabled).toBe(true);
  });
});

describe('RatingQuestion', () => {
  it('renders rating buttons for range', () => {
    const onSubmit = vi.fn();
    render(<RatingQuestion options={{ min: 1, max: 5 }} disabled={false} onSubmit={onSubmit} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(5);
    expect(buttons.map((b) => b.textContent)).toEqual(['1', '2', '3', '4', '5']);
  });

  it('shows labels', () => {
    const onSubmit = vi.fn();
    render(<RatingQuestion options={{ min: 1, max: 10, min_label: 'Bad', max_label: 'Great' }} disabled={false} onSubmit={onSubmit} />);
    expect(screen.getByText('Bad')).toBeDefined();
    expect(screen.getByText('Great')).toBeDefined();
  });

  it('calls onSubmit with number', () => {
    const onSubmit = vi.fn();
    render(<RatingQuestion options={{ min: 1, max: 5 }} disabled={false} onSubmit={onSubmit} />);
    fireEvent.click(screen.getByText('3'));
    expect(onSubmit).toHaveBeenCalledWith(3);
  });
});
