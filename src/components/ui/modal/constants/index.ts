import type { Styles } from 'react-modal';

export const DEFAULT_STYLES: Styles = {
  content: {
    position: 'static',
    width: '100%',
    maxWidth: '600px',
    margin: '0 24px',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
    color: 'var(--body-color)',
    background: 'var(--body-background)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    padding: '32px 24px',
  },
  overlay: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    background: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(15px)',
  },
};
