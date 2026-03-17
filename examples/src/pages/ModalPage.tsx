import { useState } from 'react';
import { FdbckWidget } from 'fdbck-react';
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

export function ModalPage() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ maxWidth: '32rem', margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>
        Modal Mode
      </h1>
      <p style={{ color: '#999', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        Centered overlay with a backdrop. Click the button to open.
      </p>

      <button style={buttonStyle} onClick={() => setOpen(true)}>
        Open Modal
      </button>

      <FdbckWidget
        token={FDBCK_TOKEN}
        baseUrl={FDBCK_BASE_URL}
        mode="modal"
        open={open}
        onDismiss={() => setOpen(false)}
        onSubmit={(value) => {
          console.log('Submitted:', value);
          setOpen(false);
        }}
        onError={(error) => console.error('Error:', error)}
      />
    </div>
  );
}
