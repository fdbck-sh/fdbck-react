import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useFdbck } from '../useFdbck';
import { FdbckProvider } from '../../components/FdbckProvider';
import type { ReactNode } from 'react';

const mockFetch = vi.fn();
global.fetch = mockFetch;

function Wrapper({ children }: { children: ReactNode }) {
  return <FdbckProvider>{children}</FdbckProvider>;
}

describe('useFdbck', () => {
  it('throws when used outside provider', () => {
    expect(() => {
      renderHook(() => useFdbck());
    }).toThrow('useFdbck must be used within a <FdbckProvider>');
  });

  it('returns show, dismiss, isActive inside provider', () => {
    const { result } = renderHook(() => useFdbck(), { wrapper: Wrapper });
    expect(result.current.show).toBeTypeOf('function');
    expect(result.current.dismiss).toBeTypeOf('function');
    expect(result.current.isActive).toBe(false);
  });
});
