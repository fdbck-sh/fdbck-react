import type { WidgetState } from '../hooks/useWidgetState';
import type { ResponseValue, FdbckLocale } from '../types';
import type { FdbckError } from '../lib/errors';
import { FdbckLoading } from './FdbckLoading';
import { FdbckConfirmation } from './FdbckConfirmation';
import { FdbckErrorDisplay } from './FdbckError';
import { FdbckHeader } from './FdbckHeader';
import { FdbckBody } from './FdbckBody';
import { FdbckFooter } from './FdbckFooter';

interface FdbckCardProps {
  state: WidgetState;
  locale: Required<FdbckLocale>;
  submitError: string | null;
  onSubmit: (value: ResponseValue) => void;
  onRetry: () => void;
}

/** Main card container — delegates to sub-components based on state */
export function FdbckCard({ state, locale, submitError, onSubmit, onRetry }: FdbckCardProps) {
  const { status, question, error } = state;

  if (status === 'fetching_token' || status === 'loading') {
    return (
      <div className="fdbck-card">
        <FdbckLoading />
      </div>
    );
  }

  if (status === 'error' && error) {
    const showBranding = error.code !== 'invalid_token' && error.code !== 'unknown' && !!question;
    return (
      <div className="fdbck-card">
        <FdbckErrorDisplay error={error} locale={locale} onRetry={onRetry} />
        {showBranding && <FdbckFooter hideBranding={question?.hide_branding ?? true} locale={locale} />}
      </div>
    );
  }

  if (status === 'complete' && question) {
    return (
      <div className="fdbck-card">
        <FdbckConfirmation thankYouMessage={question.thank_you_message} />
        <FdbckFooter hideBranding={question.hide_branding} locale={locale} />
      </div>
    );
  }

  if ((status === 'ready' || status === 'submitting') && question) {
    return (
      <div className="fdbck-card">
        <FdbckHeader question={question} />
        {submitError && <p className="fdbck-error-text">{submitError}</p>}
        <FdbckBody
          question={question}
          disabled={status === 'submitting'}
          locale={locale}
          onSubmit={onSubmit}
        />
        <FdbckFooter hideBranding={question.hide_branding} locale={locale} />
      </div>
    );
  }

  return null;
}
