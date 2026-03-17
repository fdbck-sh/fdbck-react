import { Link } from 'react-router-dom';

const modes = [
  {
    path: '/inline',
    title: 'Inline',
    description: 'Renders the widget directly in the page flow using <FdbckWidget mode="inline" />.',
  },
  {
    path: '/modal',
    title: 'Modal',
    description: 'Centered overlay with backdrop. Toggle open/close with a button.',
  },
  {
    path: '/popover',
    title: 'Popover',
    description: 'Floating card in the bottom-right corner. Bottom sheet on mobile.',
  },
  {
    path: '/imperative',
    title: 'Imperative',
    description: 'Uses <FdbckProvider> and the useFdbck() hook with show()/dismiss().',
  },
];

const cardStyle: React.CSSProperties = {
  padding: '1.5rem',
  border: '1px solid #222',
  borderRadius: '0.75rem',
  textDecoration: 'none',
  color: 'inherit',
  display: 'block',
  transition: 'border-color 0.15s',
};

export function Home() {
  return (
    <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
      <h1
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '1.5rem',
          fontWeight: 600,
          marginBottom: '0.5rem',
        }}
      >
        fdbck-react examples
      </h1>
      <p style={{ color: '#999', marginBottom: '2rem', fontSize: '0.875rem' }}>
        Choose a display mode to test the SDK. Set your token in{' '}
        <code style={{ color: '#FF6B35' }}>src/config.ts</code> first.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '1rem',
        }}
      >
        {modes.map(({ path, title, description }) => (
          <Link
            key={path}
            to={path}
            style={cardStyle}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#FF6B35')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#222')}
          >
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              {title}
            </h2>
            <p style={{ color: '#999', fontSize: '0.8125rem', lineHeight: 1.5 }}>
              {description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
