import { describe, expect, it } from 'vitest';

import { cn } from '@/lib/utils';

describe('cn', () => {
  it('merges Tailwind class conflicts', () => {
    expect(cn('px-2 text-xs', 'px-4', 'font-medium')).toBe('text-xs px-4 font-medium');
  });
});
