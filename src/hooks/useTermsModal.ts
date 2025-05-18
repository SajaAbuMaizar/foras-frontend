// hooks/useTermsModal.ts
import { useState } from "react";

export const useTermsModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };
};
