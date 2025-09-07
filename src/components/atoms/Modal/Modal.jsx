import { useEffect, useState } from "react";
import "./Modal.scss";

export const Modal = ({ open, children, animationMs = 200, onClose, closeOnBackdrop = false, closeOnEsc = false }) => {
  const [isMounted, setIsMounted] = useState(open);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (open) {
      setIsMounted(true);
      setIsClosing(false);
      return;
    }
    if (isMounted) {
      setIsClosing(true);
      const t = setTimeout(() => {
        setIsMounted(false);
        setIsClosing(false);
      }, animationMs);
      return () => clearTimeout(t);
    }
  }, [open, isMounted, animationMs]);

  if (!isMounted) return null;

  const backdropClass = `modal-backdrop ${isClosing ? "fade-out" : "fade-in"}`;
  const modalClass = `modal ${isClosing ? "fade-out" : "fade-in"}`;

  return (
    <div
      className={backdropClass}
      role="dialog"
      aria-modal="true"
      onClick={closeOnBackdrop ? onClose : undefined}
      onKeyDown={(e) => {
        if (closeOnEsc && e.key === "Escape") onClose && onClose();
      }}
      tabIndex={-1}
    >
      <div className={modalClass} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
