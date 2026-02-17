// components/Modal.tsx
import { useEffect, type ReactNode } from 'react';
// import Portal from './portal';
import Portal from './Portal';

// components/Modal.tsx

interface ModalProps {
  show: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  index:number;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, title,index, children }) => {
  // ESC key handler (Included in previous response)
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    if (show) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [show, onClose]);

  if (!show) {
    return null;
  }

  // >>> FUNCTION TO HANDLE CLICKING OUTSIDE (OVERLAY) <<<
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // 1. Check if the element that triggered the event (e.target) 
    //    is the same element the handler is attached to (e.currentTarget).
    // 2. Since this function is attached to the fixed, full-screen overlay DIV,
    //    if e.target === e.currentTarget, it means the user clicked directly 
    //    on the overlay (outside the white modal box).
    if (e.target === e.currentTarget) {
      onClose();
    }

    // If the click originated from an element *inside* the overlay 
    // (i.e., the white modal box or any element inside it), this condition 
    // will be false, and the modal will not close.
  };

  return (
    <Portal>
      {/* This is the fixed, full-screen overlay. 
        We attach handleOverlayClick here.
      */}
      <div 
        className="fixed inset-0 bg-black/70 flex items-center justify-center z-[1000] p-4" 
        onClick={handleOverlayClick} // <<< THIS HANDLER CLOSES THE MODAL ON OUTSIDE CLICK
      >
        {/* Modal Content Box */}
        <div 
          className="bg-white rounded-lg shadow-2xl w-full max-h-full overflow-y-auto 
                     md:w-3/4 lg:w-1/2 xl:max-w-xl" 
          // This prevents the click from propagating up to the overlay 
          // handler when the user clicks *inside* the white box.
          onClick={(e) => e.stopPropagation()} 
        >
          {/* Modal Header */}
          {/* <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h4 className="text-xl font-semibold text-gray-800">{title}</h4>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-gray-600 transition-colors text-2xl leading-none"
              aria-label="Close modal"
            >
              &times;
            </button>
          </div> */}

          {/* <div className="flex justify-end items-center p-4  border-gray-200">
            
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-gray-600 transition-colors text-2xl leading-none"
              aria-label="Close modal"
            >
              &times;
            </button>
          </div> */}
          
          {/* Modal Body */}
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;