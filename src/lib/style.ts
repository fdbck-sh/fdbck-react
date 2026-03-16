import type { FdbckStyle } from '../types';

/** Map FdbckStyle prop to CSS custom properties */
export function getStyleVars(style?: FdbckStyle): Record<string, string> {
  return {
    '--fdbck-width': style?.width || '100%',
    '--fdbck-max-width': style?.maxWidth || '28rem',
    '--fdbck-border-radius': style?.borderRadius || '0.75rem',
    '--fdbck-font-family': style?.fontFamily || "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    '--fdbck-font-size': style?.fontSize || '0.875rem',
  };
}
