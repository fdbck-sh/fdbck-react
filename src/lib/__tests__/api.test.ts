import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FdbckApiClient } from '../api';
import { FdbckError } from '../errors';

const mockFetch = vi.fn();
global.fetch = mockFetch;

function jsonResponse(data: unknown, status = 200) {
  return { ok: status >= 200 && status < 300, status, json: () => Promise.resolve(data) };
}

describe('FdbckApiClient', () => {
  let client: FdbckApiClient;

  beforeEach(() => {
    client = new FdbckApiClient('https://api.test.com');
    mockFetch.mockReset();
  });

  describe('fetchQuestion', () => {
    it('returns data on valid token', async () => {
      const data = {
        status: 'valid',
        question: { id: 'q1', question: 'Test?', type: 'yes_no', options: ['Yes', 'No'], theme_color: null, theme_mode: 'dark', hide_branding: false, welcome_message: null, thank_you_message: null },
        token: 'tok_123',
        expires_at: '2026-12-31T00:00:00Z',
      };
      mockFetch.mockResolvedValue(jsonResponse(data));

      const result = await client.fetchQuestion('tok_123');
      expect(result.status).toBe('valid');
      expect(result.question?.id).toBe('q1');
      expect(mockFetch).toHaveBeenCalledWith('https://api.test.com/v1/f/tok_123', { signal: undefined });
    });

    it('throws FdbckError on invalid status', async () => {
      mockFetch.mockResolvedValue(jsonResponse({ status: 'token_expired' }));

      await expect(client.fetchQuestion('tok_expired'))
        .rejects.toThrow(FdbckError);

      try {
        await client.fetchQuestion('tok_expired');
      } catch (err) {
        expect((err as FdbckError).code).toBe('invalid_token');
      }
    });

    it('throws network_error on fetch failure', async () => {
      mockFetch.mockRejectedValue(new TypeError('network'));

      await expect(client.fetchQuestion('tok_123'))
        .rejects.toThrow(FdbckError);
    });

    it('throws on HTTP error', async () => {
      mockFetch.mockResolvedValue({ ok: false, status: 401, json: () => Promise.resolve({}) });

      await expect(client.fetchQuestion('tok_123'))
        .rejects.toThrow(FdbckError);
    });
  });

  describe('submitResponse', () => {
    it('succeeds on 2xx', async () => {
      mockFetch.mockResolvedValue(jsonResponse({ id: 'r1' }));

      await expect(client.submitResponse('tok_123', 'Yes')).resolves.toBeUndefined();
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.test.com/v1/responses',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ token: 'tok_123', value: 'Yes' }),
        }),
      );
    });

    it('throws on HTTP error with API message', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 409,
        json: () => Promise.resolve({ error: { message: 'Already responded' } }),
      });

      try {
        await client.submitResponse('tok_123', 'Yes');
      } catch (err) {
        expect((err as FdbckError).code).toBe('already_responded');
        expect((err as FdbckError).message).toBe('Already responded');
      }
    });

    it('throws network_error on fetch failure', async () => {
      mockFetch.mockRejectedValue(new TypeError('network'));

      try {
        await client.submitResponse('tok_123', 'Yes');
      } catch (err) {
        expect((err as FdbckError).code).toBe('network_error');
      }
    });
  });
});
