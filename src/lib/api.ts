import type { TokenPageResponse, ResponseValue } from '../types';
import { FdbckError, statusToErrorCode, httpStatusToErrorCode } from './errors';

const DEFAULT_BASE_URL = 'https://api.fdbck.sh';

/** Lightweight API client for the two respondent-facing endpoints */
export class FdbckApiClient {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = (baseUrl || DEFAULT_BASE_URL).replace(/\/$/, '');
  }

  /** Fetch question data for a token via GET /v1/f/:token */
  async fetchQuestion(token: string, signal?: AbortSignal): Promise<TokenPageResponse> {
    let res: Response;
    try {
      res = await fetch(`${this.baseUrl}/v1/f/${encodeURIComponent(token)}`, { signal });
    } catch (err) {
      if ((err as Error).name === 'AbortError') throw err;
      throw new FdbckError('network_error', 'Failed to fetch question');
    }

    if (!res.ok) {
      throw new FdbckError(httpStatusToErrorCode(res.status), `HTTP ${res.status}`);
    }

    const data: TokenPageResponse = await res.json();

    if (data.status !== 'valid') {
      throw new FdbckError(statusToErrorCode(data.status), `Token status: ${data.status}`);
    }

    return data;
  }

  /** Submit a response via POST /v1/responses */
  async submitResponse(token: string, value: ResponseValue, signal?: AbortSignal): Promise<void> {
    let res: Response;
    try {
      res = await fetch(`${this.baseUrl}/v1/responses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, value }),
        signal,
      });
    } catch (err) {
      if ((err as Error).name === 'AbortError') throw err;
      throw new FdbckError('network_error', 'Failed to submit response');
    }

    if (!res.ok) {
      const body = await res.json().catch(() => null);
      const message = body?.error?.message || `HTTP ${res.status}`;
      throw new FdbckError(httpStatusToErrorCode(res.status), message);
    }
  }
}
