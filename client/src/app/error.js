'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="container-page flex min-h-screen flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow">Error</p>
      <h1 className="section-title mt-3">Something went wrong.</h1>
      <p className="mt-4 max-w-md text-muted">Please try again. If it keeps happening, let us know.</p>
      <div className="mt-8 flex gap-3">
        <Button onClick={reset}>Try again</Button>
        <Button href="/" variant="outline">
          Home
        </Button>
      </div>
    </main>
  );
}
