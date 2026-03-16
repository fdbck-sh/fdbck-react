import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FdbckCard } from '../FdbckCard';
import type { WidgetState } from '../../hooks/useWidgetState';
import { FdbckError } from '../../lib/errors';
import { resolveLocale } from '../../lib/locale';

const locale = resolveLocale();
const baseQuestion = {
  id: 'q1', question: 'Test?', type: 'yes_no' as const,
  options: ['Yes', 'No'], theme_color: null, theme_mode: 'dark' as const,
  hide_branding: false, welcome_message: null, thank_you_message: null,
};

describe('FdbckCard', () => {
  it('shows loading spinner for loading state', () => {
    const state: WidgetState = { status: 'loading', question: null, token: null, error: null, submittedValue: null };
    const { container } = render(<FdbckCard state={state} locale={locale} submitError={null} onSubmit={vi.fn()} onRetry={vi.fn()} />);
    expect(container.querySelector('.fdbck-spinner')).toBeDefined();
  });

  it('shows error state with retry', () => {
    const state: WidgetState = {
      status: 'error', question: null, token: null,
      error: new FdbckError('network_error', 'fail'), submittedValue: null,
    };
    render(<FdbckCard state={state} locale={locale} submitError={null} onSubmit={vi.fn()} onRetry={vi.fn()} />);
    expect(screen.getByText('Something went wrong')).toBeDefined();
    expect(screen.getByText('Retry')).toBeDefined();
  });

  it('shows confirmation on complete', () => {
    const state: WidgetState = {
      status: 'complete', question: baseQuestion, token: 'tok_123',
      error: null, submittedValue: 'Yes',
    };
    render(<FdbckCard state={state} locale={locale} submitError={null} onSubmit={vi.fn()} onRetry={vi.fn()} />);
    expect(screen.getByText('Response recorded')).toBeDefined();
  });

  it('shows question when ready', () => {
    const state: WidgetState = {
      status: 'ready', question: baseQuestion, token: 'tok_123',
      error: null, submittedValue: null,
    };
    render(<FdbckCard state={state} locale={locale} submitError={null} onSubmit={vi.fn()} onRetry={vi.fn()} />);
    expect(screen.getByText('Test?')).toBeDefined();
    expect(screen.getByText('Yes')).toBeDefined();
    expect(screen.getByText('No')).toBeDefined();
  });

  it('shows custom thank you message', () => {
    const q = { ...baseQuestion, thank_you_message: 'Much appreciated!' };
    const state: WidgetState = {
      status: 'complete', question: q, token: 'tok_123',
      error: null, submittedValue: 'Yes',
    };
    render(<FdbckCard state={state} locale={locale} submitError={null} onSubmit={vi.fn()} onRetry={vi.fn()} />);
    expect(screen.getByText('Thank you')).toBeDefined();
    expect(screen.getByText('Much appreciated!')).toBeDefined();
  });

  it('shows submit error text', () => {
    const state: WidgetState = {
      status: 'ready', question: baseQuestion, token: 'tok_123',
      error: null, submittedValue: null,
    };
    render(<FdbckCard state={state} locale={locale} submitError="Network error" onSubmit={vi.fn()} onRetry={vi.fn()} />);
    expect(screen.getByText('Network error')).toBeDefined();
  });
});
