// app/providers/AuthProviderWrapper.tsx
import React from 'react';
import AuthProvider from './AuthContext';
import { fetchUser } from './authService';
import { headers } from 'next/headers';


export default async function AuthProviderWrapper({ children }: { children: React.ReactNode }) {
  const headersList = headers();
  const cookie = (await headersList).get('cookie'); // get all cookies sent with SSR request

  const user = await fetchUser(cookie ?? undefined); // Pass cookie explicitly
  return <AuthProvider initialUser={user}>{children}</AuthProvider>;
}
