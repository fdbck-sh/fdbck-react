import type { FdbckLocale } from '../types';

interface FdbckFooterProps {
  hideBranding: boolean;
  locale: Required<FdbckLocale>;
}

/** "Powered by fdbck" footer, shown unless hide_branding is true */
export function FdbckFooter({ hideBranding, locale }: FdbckFooterProps) {
  if (hideBranding) return null;

  return (
    <div className="fdbck-branding">
      <a href="https://fdbck.sh" target="_blank" rel="noopener noreferrer">
        {locale.poweredBy}{' '}
        <span className="fdbck-branding-name">fdbck</span>
      </a>
    </div>
  );
}
