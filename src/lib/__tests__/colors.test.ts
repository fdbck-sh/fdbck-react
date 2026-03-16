import { describe, it, expect } from 'vitest';
import { getThemeVars } from '../colors';

describe('getThemeVars', () => {
  it('returns dark theme vars', () => {
    const vars = getThemeVars('#FF6B35', 'dark');
    expect(vars['--fdbck-accent']).toBe('#FF6B35');
    expect(vars['--fdbck-bg']).toBe('#0a0a0a');
    expect(vars['--fdbck-card-bg']).toBe('#141414');
    expect(vars['--fdbck-text-primary']).toBe('#ffffff');
  });

  it('returns light theme vars', () => {
    const vars = getThemeVars('#3B82F6', 'light');
    expect(vars['--fdbck-accent']).toBe('#3B82F6');
    expect(vars['--fdbck-bg']).toBe('#f9fafb');
    expect(vars['--fdbck-card-bg']).toBe('#ffffff');
    expect(vars['--fdbck-text-primary']).toBe('#111827');
  });

  it('defaults to #FF6B35 when null', () => {
    const vars = getThemeVars(null, 'dark');
    expect(vars['--fdbck-accent']).toBe('#FF6B35');
  });
});
