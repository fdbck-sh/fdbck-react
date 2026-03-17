import { FdbckProvider, useFdbck } from 'fdbck-react';
import { FDBCK_TOKEN, FDBCK_BASE_URL } from '../config';

const buttonStyle: React.CSSProperties = {
  padding: '0.625rem 1.25rem',
  borderRadius: '0.5rem',
  border: '1px solid #FF6B35',
  background: 'rgba(255, 107, 53, 0.1)',
  color: '#FF6B35',
  cursor: 'pointer',
  fontSize: '0.875rem',
  fontWeight: 500,
};

const secondaryButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  border: '1px solid #333',
  background: 'transparent',
  color: '#999',
};

function ImperativeDemo() {
  const { show, dismiss, isActive } = useFdbck();

  async function handleShow(mode: 'inline' | 'modal' | 'popover') {
    const result = await show({ token: FDBCK_TOKEN, mode });
    console.log('Result:', result);
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button style={buttonStyle} onClick={() => handleShow('modal')}>
          show() — modal
        </button>
        <button style={buttonStyle} onClick={() => handleShow('popover')}>
          show() — popover
        </button>
        <button style={buttonStyle} onClick={() => handleShow('inline')}>
          show() — inline
        </button>
        <button
          style={secondaryButtonStyle}
          onClick={dismiss}
          disabled={!isActive}
        >
          dismiss()
        </button>
      </div>

      <p style={{ color: '#666', fontSize: '0.8125rem', marginTop: '1rem' }}>
        isActive: <code style={{ color: isActive ? '#4ade80' : '#999' }}>{String(isActive)}</code>
      </p>
    </div>
  );
}

export function ImperativePage() {
  return (
    <div style={{ maxWidth: '32rem', margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>
        Imperative Mode
      </h1>
      <p style={{ color: '#999', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        Uses <code style={{ color: '#FF6B35' }}>{'<FdbckProvider>'}</code> and the{' '}
        <code style={{ color: '#FF6B35' }}>useFdbck()</code> hook. The{' '}
        <code>show()</code> call returns a Promise that resolves on submit or dismiss.
      </p>

      <FdbckProvider baseUrl={FDBCK_BASE_URL}>
        <ImperativeDemo />
      </FdbckProvider>
    </div>
  );
}
