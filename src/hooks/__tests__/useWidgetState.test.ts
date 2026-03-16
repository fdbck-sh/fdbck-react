import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useWidgetState } from '../useWidgetState';
import { FdbckError } from '../../lib/errors';

describe('useWidgetState', () => {
  it('starts in loading state when no token fetch needed', () => {
    const { result } = renderHook(() => useWidgetState(false));
    expect(result.current[0].status).toBe('loading');
  });

  it('starts in fetching_token state when token fetch needed', () => {
    const { result } = renderHook(() => useWidgetState(true));
    expect(result.current[0].status).toBe('fetching_token');
  });

  it('transitions through full lifecycle', () => {
    const { result } = renderHook(() => useWidgetState(true));
    const dispatch = result.current[1];

    act(() => dispatch({ type: 'TOKEN_RESOLVED', token: 'tok_123' }));
    expect(result.current[0].status).toBe('loading');
    expect(result.current[0].token).toBe('tok_123');

    const question = {
      id: 'q1', question: 'Test?', type: 'yes_no' as const,
      options: ['Yes', 'No'], theme_color: null, theme_mode: 'dark' as const,
      hide_branding: false, welcome_message: null, thank_you_message: null,
    };

    act(() => dispatch({ type: 'LOADED', question, token: 'tok_123' }));
    expect(result.current[0].status).toBe('ready');
    expect(result.current[0].question?.id).toBe('q1');

    act(() => dispatch({ type: 'SUBMITTING' }));
    expect(result.current[0].status).toBe('submitting');

    act(() => dispatch({ type: 'COMPLETE', value: 'Yes' }));
    expect(result.current[0].status).toBe('complete');
    expect(result.current[0].submittedValue).toBe('Yes');
  });

  it('handles error from any state', () => {
    const { result } = renderHook(() => useWidgetState(false));
    const dispatch = result.current[1];

    const err = new FdbckError('network_error', 'fail');
    act(() => dispatch({ type: 'ERROR', error: err }));
    expect(result.current[0].status).toBe('error');
    expect(result.current[0].error?.code).toBe('network_error');
  });

  it('resets to initial state', () => {
    const { result } = renderHook(() => useWidgetState(false));
    const dispatch = result.current[1];

    act(() => dispatch({ type: 'ERROR', error: new FdbckError('unknown', 'err') }));
    act(() => dispatch({ type: 'RESET' }));
    expect(result.current[0].status).toBe('loading');
    expect(result.current[0].error).toBeNull();
  });
});
