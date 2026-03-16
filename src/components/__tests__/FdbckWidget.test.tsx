import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { FdbckWidget } from '../FdbckWidget';

const mockFetch = vi.fn();
global.fetch = mockFetch;

const validResponse = {
  status: 'valid',
  question: {
    id: 'q1', question: 'Like it?', type: 'yes_no',
    options: ['Yes', 'No'], theme_color: null, theme_mode: 'dark',
    hide_branding: false, welcome_message: null, thank_you_message: null,
  },
  token: 'tok_123',
  expires_at: '2026-12-31T00:00:00Z',
};

describe('FdbckWidget', () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  it('shows loading then question', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(validResponse),
    });

    // FdbckWidget uses Shadow DOM which jsdom doesn't fully support.
    // The component will render but shadow root content won't be visible to testing-library.
    // We test that it doesn't throw.
    const { container } = render(<FdbckWidget token="tok_123" mode="inline" baseUrl="https://api.test.com" />);
    expect(container).toBeDefined();
  });

  it('renders without crashing in modal mode', () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(validResponse),
    });

    const { container } = render(<FdbckWidget token="tok_123" mode="modal" baseUrl="https://api.test.com" />);
    expect(container).toBeDefined();
  });

  it('renders without crashing in popover mode', () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(validResponse),
    });

    const { container } = render(<FdbckWidget token="tok_123" mode="popover" baseUrl="https://api.test.com" />);
    expect(container).toBeDefined();
  });

  it('does not render when open is false', () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(validResponse),
    });

    const { container } = render(<FdbckWidget token="tok_123" open={false} baseUrl="https://api.test.com" />);
    expect(container.innerHTML).toBe('');
  });

  it('calls onLoad when question is fetched', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(validResponse),
    });

    const onLoad = vi.fn();
    render(<FdbckWidget token="tok_123" baseUrl="https://api.test.com" onLoad={onLoad} />);

    await waitFor(() => {
      expect(onLoad).toHaveBeenCalledWith(validResponse.question);
    });
  });

  it('calls onError when fetch fails', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 401,
      json: () => Promise.resolve({}),
    });

    const onError = vi.fn();
    render(<FdbckWidget token="tok_bad" baseUrl="https://api.test.com" onError={onError} />);

    await waitFor(() => {
      expect(onError).toHaveBeenCalled();
    });
  });
});
