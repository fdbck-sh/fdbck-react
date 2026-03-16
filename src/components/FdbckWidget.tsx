import { useEffect, useRef, useState, useCallback } from 'react';
import type { FdbckWidgetProps, ResponseValue } from '../types';
import { FdbckApiClient } from '../lib/api';
import { FdbckError } from '../lib/errors';
import { getThemeVars } from '../lib/colors';
import { getStyleVars } from '../lib/style';
import { resolveLocale } from '../lib/locale';
import { useWidgetState } from '../hooks/useWidgetState';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { FdbckShadowHost } from './FdbckShadowHost';
import { FdbckCard } from './FdbckCard';

/**
 * Low-level public component. Takes a pre-resolved token and renders the
 * feedback widget in inline, modal, or popover mode.
 */
export function FdbckWidget({
  token,
  mode = 'inline',
  open = true,
  baseUrl,
  delay = 0,
  autoCloseAfter,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  locale: localeProp,
  style: styleProp,
  onSubmit,
  onDismiss,
  onError,
  onLoad,
}: FdbckWidgetProps) {
  const [state, dispatch] = useWidgetState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [visible, setVisible] = useState(delay === 0);
  const clientRef = useRef(new FdbckApiClient(baseUrl));
  const submitRef = useRef(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const locale = resolveLocale(localeProp);

  // Delay before showing
  useEffect(() => {
    if (delay <= 0 || visible) return;
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay, visible]);

  // Fetch question data
  const loadQuestion = useCallback(() => {
    const controller = new AbortController();
    clientRef.current
      .fetchQuestion(token, controller.signal)
      .then((data) => {
        dispatch({ type: 'LOADED', question: data.question!, token: data.token! });
        onLoad?.(data.question!);
      })
      .catch((err) => {
        if ((err as Error).name === 'AbortError') return;
        const fdbckErr = err instanceof FdbckError ? err : new FdbckError('unknown', (err as Error).message);
        dispatch({ type: 'ERROR', error: fdbckErr });
        onError?.(fdbckErr);
      });
    return () => controller.abort();
  }, [token, onLoad, onError]);

  useEffect(() => {
    return loadQuestion();
  }, [loadQuestion]);

  // Submit handler
  function handleSubmit(value: ResponseValue) {
    if (submitRef.current) return;
    submitRef.current = true;
    setSubmitError(null);
    dispatch({ type: 'SUBMITTING' });

    clientRef.current
      .submitResponse(state.token || token, value)
      .then(() => {
        dispatch({ type: 'COMPLETE', value });
        onSubmit?.(value);

        if (autoCloseAfter && autoCloseAfter > 0) {
          setTimeout(() => onDismiss?.(), autoCloseAfter);
        }
      })
      .catch((err) => {
        const msg = err instanceof FdbckError ? err.message : 'Something went wrong';
        setSubmitError(msg);
        dispatch({ type: 'LOADED', question: state.question!, token: state.token! });
        submitRef.current = false;
        onError?.(err instanceof FdbckError ? err : new FdbckError('unknown', String(err)));
      });
  }

  function handleRetry() {
    dispatch({ type: 'RESET' });
    submitRef.current = false;
    setSubmitError(null);
    loadQuestion();
  }

  // Escape key handler for modal/popover
  useEffect(() => {
    if (mode === 'inline' || !closeOnEscape || !open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onDismiss?.();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mode, closeOnEscape, open, onDismiss]);

  // Focus trap for modal
  useFocusTrap(modalRef, mode === 'modal' && open && visible);

  if (!open || !visible) return null;

  // Compute CSS custom properties
  const themeVars = getThemeVars(state.question?.theme_color ?? null, state.question?.theme_mode ?? 'dark');
  const styleVars = getStyleVars(styleProp);
  const cssVars = { ...themeVars, ...styleVars };

  const card = (
    <FdbckCard
      state={state}
      locale={locale}
      submitError={submitError}
      onSubmit={handleSubmit}
      onRetry={handleRetry}
    />
  );

  if (mode === 'modal') {
    return (
      <FdbckShadowHost style={cssVars}>
        <div
          className="fdbck-modal-backdrop"
          onClick={closeOnOverlayClick ? onDismiss : undefined}
          role="dialog"
          aria-modal="true"
        >
          <div
            ref={modalRef}
            className="fdbck-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="fdbck-close-btn" onClick={onDismiss} aria-label={locale.close}>
              &times;
            </button>
            {card}
          </div>
        </div>
      </FdbckShadowHost>
    );
  }

  if (mode === 'popover') {
    return (
      <FdbckShadowHost style={cssVars}>
        <div className="fdbck-popover" role="dialog">
          <button className="fdbck-close-btn" onClick={onDismiss} aria-label={locale.close}>
            &times;
          </button>
          {card}
        </div>
      </FdbckShadowHost>
    );
  }

  // Inline mode
  return (
    <FdbckShadowHost style={cssVars}>
      {card}
    </FdbckShadowHost>
  );
}
