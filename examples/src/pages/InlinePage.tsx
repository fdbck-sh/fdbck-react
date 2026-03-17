import { FdbckWidget } from 'fdbck-react';
import { FDBCK_TOKEN, FDBCK_BASE_URL } from '../config';

export function InlinePage() {
  return (
    <div style={{ maxWidth: '32rem', margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>
        Inline Mode
      </h1>
      <p style={{ color: '#999', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        The widget renders directly in the page flow.
      </p>

      <FdbckWidget
        token={FDBCK_TOKEN}
        baseUrl={FDBCK_BASE_URL}
        mode="inline"
        onSubmit={(value) => console.log('Submitted:', value)}
        onLoad={(question) => console.log('Loaded:', question)}
        onError={(error) => console.error('Error:', error)}
      />
    </div>
  );
}
