// components/Modal.tsx
import { useEffect, type ReactNode } from "react";
// import Portal from './portal';
import Portal from "./Portal";

// components/Modal.tsx

interface ModalProps {
  show: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  index: number;
  /** Show the X close button in the top-right corner. Default: true */
  showCloseButton?: boolean;
  /** Close modal when clicking the overlay backdrop. Default: true */
  closeOnOverlayClick?: boolean;
  /** Close modal when pressing the Escape key. Default: true */
  closeOnEsc?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  show,
  onClose,
  title,
  index,
  children,
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEsc = true,
}) => {
  // ESC key handler (Included in previous response)
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (closeOnEsc && event.key === "Escape") {
        onClose();
      }
    };

    if (show) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [show, onClose]);

  if (!show) {
    return null;
  }

  // >>> FUNCTION TO HANDLE CLICKING OUTSIDE (OVERLAY) <<<
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Portal>
      {/* This is the fixed, full-screen overlay. 
        We attach handleOverlayClick here.
      */}
      <div
        className="fixed inset-0 bg-black/70 flex items-center justify-center z-[1000] p-4"
        onClick={handleOverlayClick}
      >
        {/* Modal Content Box */}
        <div
          className="bg-white rounded-lg shadow-2xl w-full max-h-full overflow-y-auto
                     md:w-3/4 lg:w-1/2 xl:max-w-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header (optional close button) */}
          {showCloseButton && (
            <div className="flex justify-end items-center p-3">
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>
          )}

          {/* Modal Body */}
          <div className="">{children}</div>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
