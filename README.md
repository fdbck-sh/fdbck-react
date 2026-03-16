# fdbck-react

[![npm version](https://img.shields.io/npm/v/fdbck-react.svg)](https://www.npmjs.com/package/fdbck-react)
[![license](https://img.shields.io/npm/l/fdbck-react.svg)](https://www.npmjs.com/package/fdbck-react)

Official React SDK for [fdbck](https://fdbck.sh) — embed feedback questions natively in your React app with Shadow DOM CSS isolation.

## Install

```bash
npm install fdbck-react
```

```bash
yarn add fdbck-react
```

```bash
pnpm add fdbck-react
```

Requires React 18+.

## Quick start

### 1. Direct token (simplest)

Generate a response token on your backend (via the Node.js or Python SDK), then pass it to the widget:

```tsx
import { FdbckWidget } from 'fdbck-react';

function App() {
  return (
    <FdbckWidget
      token="V7xH2kQ9mPn4wR1j"
      mode="inline"
      onSubmit={(value) => console.log('Submitted:', value)}
    />
  );
}
```

### 2. Imperative API (provider pattern)

For showing feedback modals/popovers imperatively:

```tsx
import { FdbckProvider, useFdbck } from 'fdbck-react';

function App() {
  return (
    <FdbckProvider>
      <FeedbackButton />
    </FdbckProvider>
  );
}

function FeedbackButton() {
  const { show } = useFdbck();

  async function handleClick() {
    const result = await show({
      token: 'V7xH2kQ9mPn4wR1j',
      mode: 'modal',
    });

    if (result.status === 'submitted') {
      console.log('Response:', result.value);
    }
  }

  return <button onClick={handleClick}>Give feedback</button>;
}
```

## Display modes

| Mode | Description |
|------|-------------|
| `inline` | Renders the card in the document flow |
| `modal` | Centered overlay with backdrop, focus trap, Escape to dismiss |
| `popover` | Bottom-right floating card (desktop), bottom sheet (mobile ≤640px) |

## API reference

### `<FdbckWidget>`

Takes a pre-resolved response token and renders the feedback widget.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `token` | `string` | required | Response token |
| `mode` | `'inline' \| 'modal' \| 'popover'` | `'inline'` | Display mode |
| `open` | `boolean` | `true` | Whether the widget is visible |
| `baseUrl` | `string` | `'https://api.fdbck.sh'` | API base URL |
| `delay` | `number` | `0` | Delay in ms before showing |
| `autoCloseAfter` | `number` | — | Auto-dismiss after submission (ms) |
| `closeOnOverlayClick` | `boolean` | `true` | Dismiss modal on backdrop click |
| `closeOnEscape` | `boolean` | `true` | Dismiss on Escape key |
| `locale` | `FdbckLocale` | — | Custom text strings |
| `style` | `FdbckStyle` | — | Style overrides |
| `onSubmit` | `(value: ResponseValue) => void` | — | Called on successful submission |
| `onDismiss` | `() => void` | — | Called when dismissed |
| `onError` | `(error: FdbckError) => void` | — | Called on error |
| `onLoad` | `(question: QuestionData) => void` | — | Called when question data loads |

### `<FdbckProvider>` + `useFdbck()`

Provider for the imperative API.

```tsx
const { show, dismiss, isActive } = useFdbck();

// show() accepts token + display options, returns Promise<FdbckResult>
const result = await show({ token: '...', mode: 'modal' });
// result: { status: 'submitted', value: 'Yes' } or { status: 'dismissed' }
```

## Theming

The widget inherits theme settings from the question (`theme_color`, `theme_mode`). Override layout with the `style` prop:

```tsx
<FdbckWidget
  token="..."
  style={{
    maxWidth: '400px',
    borderRadius: '1rem',
    fontFamily: 'Inter, sans-serif',
  }}
/>
```

## CSS isolation

All styles are injected into a Shadow DOM, so the widget's CSS won't leak into your app and your app's CSS won't affect the widget.

## Accessibility

- Modal mode includes a focus trap and `role="dialog"` with `aria-modal="true"`
- Popover mode includes `role="dialog"`
- All animations respect `prefers-reduced-motion`
- Interactive elements are keyboard-navigable

## SSR compatibility

The widget uses `useEffect` for all DOM operations (Shadow DOM, fetch). It renders nothing on the server and hydrates on the client. Safe for Next.js, Remix, and other SSR frameworks.

## Bundle size

~7KB gzipped (including all CSS).

## Links

- [npm](https://www.npmjs.com/package/fdbck-react)
- [Documentation](https://docs.fdbck.sh/sdks/react)
- [GitHub](https://github.com/fdbck-sh/fdbck-react)
- [fdbck](https://fdbck.sh)

## License

MIT
