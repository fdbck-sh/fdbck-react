import { describe, it, expect } from 'vitest';
import { FdbckError, statusToErrorCode, httpStatusToErrorCode } from '../errors';

describe('FdbckError', () => {
  it('creates error with code and message', () => {
    const err = new FdbckError('network_error', 'fetch failed');
    expect(err.code).toBe('network_error');
    expect(err.message).toBe('fetch failed');
    expect(err.name).toBe('FdbckError');
    expect(err).toBeInstanceOf(Error);
  });
});

describe('statusToErrorCode', () => {
  it('maps known statuses', () => {
    expect(statusToErrorCode('invalid')).toBe('invalid_token');
    expect(statusToErrorCode('token_expired')).toBe('invalid_token');
    expect(statusToErrorCode('already_responded')).toBe('already_responded');
    expect(statusToErrorCode('question_ended')).toBe('question_expired');
  });

  it('returns unknown for unrecognized status', () => {
    expect(statusToErrorCode('something_else')).toBe('unknown');
  });
});

describe('httpStatusToErrorCode', () => {
  it('maps HTTP status codes', () => {
    expect(httpStatusToErrorCode(401)).toBe('invalid_token');
    expect(httpStatusToErrorCode(409)).toBe('already_responded');
    expect(httpStatusToErrorCode(410)).toBe('question_expired');
    expect(httpStatusToErrorCode(500)).toBe('unknown');
  });
});
