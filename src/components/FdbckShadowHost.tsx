import { useRef, useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { WIDGET_CSS } from '../styles/index';

interface FdbckShadowHostProps {
  children: ReactNode;
  style?: Record<string, string>;
}

/** Renders children inside a Shadow DOM for CSS isolation, using createPortal to preserve React context */
export function FdbckShadowHost({ children, style }: FdbckShadowHostProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || host.shadowRoot) return;

    const shadow = host.attachShadow({ mode: 'open' });

    const styleEl = document.createElement('style');
    styleEl.textContent = WIDGET_CSS;
    shadow.appendChild(styleEl);

    const wrapper = document.createElement('div');
    shadow.appendChild(wrapper);

    setContainer(wrapper);
  }, []);

  useEffect(() => {
    if (!container || !style) return;
    const parent = container.parentNode as ShadowRoot | null;
    const host = parent?.host as HTMLElement | undefined;
    if (host) {
      for (const [key, value] of Object.entries(style)) {
        host.style.setProperty(key, value);
      }
    }
  }, [container, style]);

  return (
    <div ref={hostRef}>
      {container && createPortal(children, container)}
    </div>
  );
}
