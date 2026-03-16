import type { FdbckLocale } from '../types';

const DEFAULT_LOCALE: Required<FdbckLocale> = {
  submit: 'Submit',
  poweredBy: 'Powered by',
  loading: 'Loading…',
  errorTitle: 'Something went wrong',
  errorMessage: 'Unable to load this question. Please try again later.',
  retry: 'Retry',
  close: 'Close',
};

/** Merge user locale overrides with defaults */
export function resolveLocale(locale?: FdbckLocale): Required<FdbckLocale> {
  if (!locale) return DEFAULT_LOCALE;
  return { ...DEFAULT_LOCALE, ...locale };
}
