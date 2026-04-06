// components/Portal.tsx
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

interface PortalProps {
  children: ReactNode;
}

const Portal: React.FC<PortalProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  // This effect runs only once on the client side after the initial render
  useEffect(() => {
    setMounted(true);
  }, []);

  // We check for 'mounted' to ensure this only runs in the browser
  // We explicitly assert that document.body exists since we checked 'mounted'
  return mounted
    ? createPortal(children, document.body as HTMLElement)
    : null;
};

export default Portal;