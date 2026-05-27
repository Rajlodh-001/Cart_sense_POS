import { useEffect } from "react";

interface ShortcutHandlers {
  onSearchFocus?: () => void;
  onClearSearch?: () => void;
  onPlaceOrder?: () => void;
  onPromoToggle?: () => void;
  onQrisClick?: () => void;
}

export function useKeyboardShortcuts(handlers: ShortcutHandlers) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const isInputFocused =
        activeEl instanceof HTMLInputElement || activeEl instanceof HTMLTextAreaElement;

      // 1. Focus Search: '/' (when not typing in an input) or 'F1' or 'Ctrl+F'
      if (
        (e.key === "/" && !isInputFocused) ||
        e.key === "F1" ||
        (e.ctrlKey && e.key.toLowerCase() === "f")
      ) {
        e.preventDefault();
        handlers.onSearchFocus?.();
        const searchInput = document.getElementById("pos-search-input");
        searchInput?.focus();
        if (searchInput instanceof HTMLInputElement) {
          searchInput.select();
        }
      }

      // 2. Clear Search / Escape Focus: 'Escape'
      if (e.key === "Escape") {
        if (isInputFocused && activeEl.id === "pos-search-input") {
          e.preventDefault();
          handlers.onClearSearch?.();
          activeEl.blur();
        }
      }

      // 3. Place Order (Checkout): 'F2' or 'Ctrl+Enter'
      if (e.key === "F2" || (e.ctrlKey && e.key === "Enter")) {
        e.preventDefault();
        handlers.onPlaceOrder?.();
        const placeOrderBtn = document.getElementById("pos-place-order-btn");
        if (placeOrderBtn && !placeOrderBtn.hasAttribute("disabled")) {
          (placeOrderBtn as HTMLButtonElement).click();
        }
      }

      // 4. Promo Code Toggle: 'F3' or 'Alt+P'
      if (e.key === "F3" || (e.altKey && e.key.toLowerCase() === "p")) {
        e.preventDefault();
        handlers.onPromoToggle?.();
        const promoBtn = document.getElementById("pos-promo-btn");
        if (promoBtn) {
          (promoBtn as HTMLButtonElement).click();
        }
        // Focus the promo input if it exists
        setTimeout(() => {
          const promoInput = document.querySelector('input[placeholder="Enter Promo"]');
          if (promoInput instanceof HTMLInputElement) {
            promoInput.focus();
            promoInput.select();
          }
        }, 50);
      }

      // 5. QRIS Click: 'F4'
      if (e.key === "F4") {
        e.preventDefault();
        handlers.onQrisClick?.();
        const qrisBtn = document.getElementById("pos-qris-btn");
        if (qrisBtn) {
          (qrisBtn as HTMLButtonElement).click();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handlers]);
}
