import type { FdbckLocale } from '../types';
import type { FdbckError as FdbckErrorType } from '../lib/errors';

interface FdbckErrorProps {
  error: FdbckErrorType;
  locale: Required<FdbckLocale>;
  onRetry?: () => void;
}

const ERROR_TITLES: Record<string, string> = {
  invalid_token: 'Invalid link',
  already_responded: 'Already responded',
  question_expired: 'Question closed',
};

const ERROR_MESSAGES: Record<string, string> = {
  invalid_token: 'This response link is not valid.',
  already_responded: "You've already responded to this.",
  question_expired: 'This question has closed.',
};

/** Error state with optional retry button */
export function FdbckErrorDisplay({ error, locale, onRetry }: FdbckErrorProps) {
  const title = ERROR_TITLES[error.code] || locale.errorTitle;
  const message = ERROR_MESSAGES[error.code] || locale.errorMessage;
  const isRetryable = error.code === 'network_error' || error.code === 'unknown';

  return (
    <div className="fdbck-error-state">
      <h2>{title}</h2>
      <p>{message}</p>
      {isRetryable && onRetry && (
        <button className="fdbck-retry-btn" onClick={onRetry}>
          {locale.retry}
        </button>
      )}
    </div>
  );
}
