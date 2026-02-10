'use client';

import { Button } from '@/components/ui/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 text-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">Application Error</h1>
            <p className="text-lg text-gray-600">Something went wrong with the application.</p>
            {process.env.NODE_ENV === 'development' && error.message && (
              <details className="mt-4 max-w-md text-left">
                <summary className="cursor-pointer text-sm font-medium">
                  Error details (development only)
                </summary>
                <pre className="mt-2 text-xs whitespace-pre-wrap text-gray-500">
                  {error.message}
                </pre>
              </details>
            )}
          </div>

          <div className="flex gap-4">
            <Button onClick={reset}>Try again</Button>
            <Button onClick={() => (window.location.href = '/')} variant="outline">
              Go home
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
