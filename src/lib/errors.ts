/** Error codes produced by the React SDK */
export type FdbckErrorCode =
  | 'invalid_token'
  | 'already_responded'
  | 'question_expired'
  | 'network_error'
  | 'dismissed'
  | 'unknown';

/** Typed error for fdbck React SDK */
export class FdbckError extends Error {
  readonly code: FdbckErrorCode;

  constructor(code: FdbckErrorCode, message: string) {
    super(message);
    this.name = 'FdbckError';
    this.code = code;
  }
}

/** Map API token page status to error code */
export function statusToErrorCode(status: string): FdbckErrorCode {
  switch (status) {
    case 'invalid':
    case 'token_expired':
      return 'invalid_token';
    case 'already_responded':
      return 'already_responded';
    case 'question_ended':
      return 'question_expired';
    default:
      return 'unknown';
  }
}

/** Map HTTP status code to error code */
export function httpStatusToErrorCode(status: number): FdbckErrorCode {
  if (status === 401) return 'invalid_token';
  if (status === 409) return 'already_responded';
  if (status === 410) return 'question_expired';
  return 'unknown';
}
