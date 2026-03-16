import { createContext, useState, useCallback, useRef, type ReactNode } from 'react';
import type { FdbckProviderProps, UseFdbckReturn, UseFdbckOptions, FdbckResult, ResponseValue } from '../types';
import { FdbckError } from '../lib/errors';
import { FdbckWidget } from './FdbckWidget';

interface FdbckContextValue {
  show: (options: UseFdbckOptions) => Promise<FdbckResult>;
  dismiss: () => void;
  isActive: boolean;
  baseUrl?: string;
  locale?: FdbckProviderProps['locale'];
  style?: FdbckProviderProps['style'];
}

export const FdbckContext = createContext<FdbckContextValue | null>(null);

/** Context provider for the imperative useFdbck() hook */
export function FdbckProvider({ baseUrl, locale, style, children }: FdbckProviderProps) {
  const [activeConfig, setActiveConfig] = useState<UseFdbckOptions | null>(null);
  const resolverRef = useRef<{ resolve: (result: FdbckResult) => void; reject: (err: Error) => void } | null>(null);

  const show = useCallback((options: UseFdbckOptions): Promise<FdbckResult> => {
    return new Promise<FdbckResult>((resolve, reject) => {
      resolverRef.current = { resolve, reject };
      setActiveConfig(options);
    });
  }, []);

  const dismiss = useCallback(() => {
    if (resolverRef.current) {
      resolverRef.current.resolve({ status: 'dismissed' });
      resolverRef.current = null;
    }
    setActiveConfig(null);
  }, []);

  const handleSubmit = useCallback((value: ResponseValue) => {
    if (resolverRef.current) {
      resolverRef.current.resolve({ status: 'submitted', value });
      resolverRef.current = null;
    }
    setActiveConfig(null);
  }, []);

  const handleError = useCallback((err: Error) => {
    // Don't reject — let the widget display the error
    activeConfig; // eslint-disable-line
  }, []);

  const contextValue: FdbckContextValue = {
    show,
    dismiss,
    isActive: activeConfig !== null,
    baseUrl,
    locale,
    style,
  };

  return (
    <FdbckContext.Provider value={contextValue}>
      {children}
      {activeConfig && (
        <FdbckWidget
          token={activeConfig.token}
          mode={activeConfig.mode || 'modal'}
          open={activeConfig.open ?? true}
          baseUrl={activeConfig.baseUrl || baseUrl}
          delay={activeConfig.delay}
          autoCloseAfter={activeConfig.autoCloseAfter}
          closeOnOverlayClick={activeConfig.closeOnOverlayClick}
          closeOnEscape={activeConfig.closeOnEscape}
          locale={activeConfig.locale || locale}
          style={activeConfig.style || style}
          onSubmit={handleSubmit}
          onDismiss={dismiss}
          onError={handleError}
        />
      )}
    </FdbckContext.Provider>
  );
}
