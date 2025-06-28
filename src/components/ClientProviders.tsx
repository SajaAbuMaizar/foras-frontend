// src/components/ClientProviders.tsx
'use client';

import React from 'react';
import ErrorBoundary from '@/components/errors/ErrorBoundary';
import { LanguageProvider } from '@/context/language/LanguageContext';
import { ToastProvider } from '@/components/ui/ToastProvider';

interface ClientProvidersProps {
  children: React.ReactNode;
  initialLang: 'ar' | 'he';
}

export default function ClientProviders({ children, initialLang }: ClientProvidersProps) {
  return (
    <LanguageProvider initialLang={initialLang}>
      <ErrorBoundary>
        {children}
        <ToastProvider />
      </ErrorBoundary>
    </LanguageProvider>
  );
}