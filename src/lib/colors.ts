/** Derive CSS custom properties from theme_color and theme_mode */
export function getThemeVars(themeColor: string | null, themeMode: 'light' | 'dark'): Record<string, string> {
  const accent = themeColor || '#FF6B35';
  const isDark = themeMode === 'dark';

  return {
    '--fdbck-accent': accent,
    '--fdbck-accent-alpha': `${accent}18`,
    '--fdbck-bg': isDark ? '#0a0a0a' : '#f9fafb',
    '--fdbck-card-bg': isDark ? '#141414' : '#ffffff',
    '--fdbck-border': isDark ? '#262626' : '#e5e7eb',
    '--fdbck-text-primary': isDark ? '#ffffff' : '#111827',
    '--fdbck-text-secondary': isDark ? '#9ca3af' : '#6b7280',
    '--fdbck-text-muted': isDark ? '#6b7280' : '#9ca3af',
    '--fdbck-indicator-border': isDark ? '#52525b' : '#d1d5db',
  };
}
