import { Link, Outlet, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/inline', label: 'Inline' },
  { path: '/modal', label: 'Modal' },
  { path: '/popover', label: 'Popover' },
  { path: '/imperative', label: 'Imperative' },
];

export function Layout() {
  const { pathname } = useLocation();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header
        style={{
          padding: '1rem 2rem',
          borderBottom: '1px solid #222',
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
        }}
      >
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              fontSize: '1.25rem',
              color: '#FF6B35',
            }}
          >
            {'>'}_fdbck
          </span>
          <span style={{ color: '#666', marginLeft: '0.5rem', fontSize: '0.875rem' }}>
            react examples
          </span>
        </Link>

        <nav style={{ display: 'flex', gap: '0.25rem', marginLeft: 'auto' }}>
          {navItems.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              style={{
                padding: '0.375rem 0.75rem',
                borderRadius: '0.375rem',
                textDecoration: 'none',
                fontSize: '0.875rem',
                color: pathname === path ? '#FF6B35' : '#999',
                background: pathname === path ? 'rgba(255, 107, 53, 0.1)' : 'transparent',
              }}
            >
              {label}
            </Link>
          ))}
        </nav>
      </header>

      <main style={{ flex: 1, padding: '2rem' }}>
        <Outlet />
      </main>
    </div>
  );
}
