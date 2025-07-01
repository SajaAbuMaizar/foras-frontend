// src/context/accessibility/AccessibilityContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AccessibilityContextType {
  isScreenReaderActive: boolean;
  announceMessage: (message: string) => void;
  focusableElements: HTMLElement[];
  currentFocusIndex: number;
  moveFocus: (direction: 'next' | 'prev') => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | null>(null);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isScreenReaderActive, setIsScreenReaderActive] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const [focusableElements, setFocusableElements] = useState<HTMLElement[]>([]);
  const [currentFocusIndex, setCurrentFocusIndex] = useState(0);

  // Detect screen reader
  useEffect(() => {
    const detectScreenReader = () => {
      // Check for common screen reader indicators
      const hasAriaLive = document.querySelector('[aria-live]');
      const hasRole = document.querySelector('[role="application"]');
      setIsScreenReaderActive(!!hasAriaLive || !!hasRole);
    };

    detectScreenReader();
    window.addEventListener('load', detectScreenReader);
    return () => window.removeEventListener('load', detectScreenReader);
  }, []);

  // Update focusable elements
  useEffect(() => {
    const updateFocusableElements = () => {
      const elements = Array.from(
        document.querySelectorAll(
          'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        )
      ) as HTMLElement[];
      setFocusableElements(elements.filter(el => !el.hasAttribute('disabled')));
    };

    updateFocusableElements();
    const observer = new MutationObserver(updateFocusableElements);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Tab navigation enhancement
      if (e.key === 'Tab') {
        const direction = e.shiftKey ? 'prev' : 'next';
        moveFocus(direction);
      }

      // Skip to main content
      if (e.key === '1' && e.altKey) {
        const main = document.querySelector('main');
        if (main) {
          (main as HTMLElement).focus();
          announceMessage('דילוג לתוכן הראשי');
        }
      }

      // Skip to navigation
      if (e.key === '2' && e.altKey) {
        const nav = document.querySelector('nav');
        if (nav) {
          (nav as HTMLElement).focus();
          announceMessage('דילוג לתפריט ניווט');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentFocusIndex, focusableElements]);

  const announceMessage = (message: string) => {
    setAnnouncement(message);
    // Clear after announcement
    setTimeout(() => setAnnouncement(''), 1000);
  };

  const moveFocus = (direction: 'next' | 'prev') => {
    if (focusableElements.length === 0) return;

    let newIndex = currentFocusIndex;
    if (direction === 'next') {
      newIndex = (currentFocusIndex + 1) % focusableElements.length;
    } else {
      newIndex = currentFocusIndex === 0 ? focusableElements.length - 1 : currentFocusIndex - 1;
    }

    setCurrentFocusIndex(newIndex);
    focusableElements[newIndex]?.focus();
  };

  return (
    <AccessibilityContext.Provider
      value={{
        isScreenReaderActive,
        announceMessage,
        focusableElements,
        currentFocusIndex,
        moveFocus,
      }}
    >
      {children}
      {/* Live region for screen reader announcements */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};