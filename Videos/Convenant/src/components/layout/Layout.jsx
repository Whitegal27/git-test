import React from 'react';

export function Layout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
}

export function PageLayout({ children }) {
  return (
    <main className="container mx-auto px-4 py-8">
      {children}
    </main>
  );
}

export function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {children}
      </div>
    </div>
  );
}
