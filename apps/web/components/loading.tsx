import { Skeleton } from '@/components/ui/skeleton';
import { Loader2Icon } from 'lucide-react';

type LoadingProps = {
  variant?: 'spinner' | 'skeleton';
  size?: 'sm' | 'md' | 'lg';
  text?: string;
};

export function Loading({ variant = 'spinner', size = 'md', text = 'Loading...' }: LoadingProps) {
  if (variant === 'skeleton') {
    return (
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    );
  }

  const sizeClasses = {
    sm: 'size-4',
    md: 'size-6',
    lg: 'size-8',
  };

  return (
    <div className="flex items-center justify-center gap-2 p-4">
      <Loader2Icon className={`${sizeClasses[size]} animate-spin`} />
      {text && <span className="text-muted-foreground text-sm">{text}</span>}
    </div>
  );
}
