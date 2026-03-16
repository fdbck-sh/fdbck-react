import { useContext } from 'react';
import { FdbckContext } from '../components/FdbckProvider';
import type { UseFdbckReturn } from '../types';

/** Imperative API for showing/dismissing feedback widgets. Must be used within FdbckProvider. */
export function useFdbck(): UseFdbckReturn {
  const context = useContext(FdbckContext);

  if (!context) {
    throw new Error('useFdbck must be used within a <FdbckProvider>');
  }

  return {
    show: context.show,
    dismiss: context.dismiss,
    isActive: context.isActive,
  };
}
