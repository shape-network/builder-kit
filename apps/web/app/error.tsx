'use client';

import { Button } from '@/components/ui/button';
import { AlertTriangleIcon, RefreshCwIcon } from 'lucide-react';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-6 p-8 text-center">
      <AlertTriangleIcon className="text-destructive size-16" />

      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Something went wrong!</h1>
        <p className="text-muted-foreground max-w-md">
          An unexpected error occurred. This could be a temporary issue.
        </p>
        {process.env.NODE_ENV === 'development' && error.message && (
          <details className="mt-4 text-left">
            <summary className="cursor-pointer text-sm font-medium">
              Error details (development only)
            </summary>
            <pre className="text-muted-foreground mt-2 text-xs whitespace-pre-wrap">
              {error.message}
            </pre>
          </details>
        )}
      </div>

      <div className="flex gap-4">
        <Button onClick={reset} className="gap-2">
          <RefreshCwIcon className="size-4" />
          Try again
        </Button>
        <Button variant="outline" onClick={() => (window.location.href = '/')}>
          Go home
        </Button>
      </div>
    </div>
  );
}
