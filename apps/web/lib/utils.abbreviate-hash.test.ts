import { describe, expect, it } from 'vitest';

import { abbreviateHash } from '@/lib/utils';

describe('abbreviateHash', () => {
  it('abbreviates a hex string hash', () => {
    expect(abbreviateHash('0x1234567890abcdef')).toBe('0x1234...cdef');
  });

  it('abbreviates a Buffer hash', () => {
    expect(abbreviateHash(Buffer.from('1234567890abcdef', 'hex'))).toBe('0x1234...cdef');
  });

  it('throws if hash is too short', () => {
    expect(() => abbreviateHash('0x1234', 3, 3)).toThrow('Hash is too short to abbreviate.');
  });
});
