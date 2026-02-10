import { Button } from '@/components/ui/button';
import { FileQuestionIcon, HomeIcon } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center gap-6 p-8 text-center">
      <FileQuestionIcon className="text-muted-foreground size-16" />

      <div className="space-y-2">
        <h1 className="text-4xl font-bold">404</h1>
        <h2 className="text-xl font-semibold">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
      </div>

      <Button asChild className="gap-2">
        <Link href="/">
          <HomeIcon className="size-4" />
          Go back home
        </Link>
      </Button>
    </div>
  );
}
