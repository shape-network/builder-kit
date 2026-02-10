import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function abbreviateHash(
  hash: string | Buffer,
  prefixLength: number = 4,
  suffixLength: number = 4
): string {
  let hashString: string;

  if (Buffer.isBuffer(hash)) {
    hashString = hash.toString('hex');
  } else if (typeof hash === 'string') {
    hashString = hash.startsWith('0x') ? hash.slice(2) : hash;
  } else {
    throw new Error('Invalid hash format. Expected string or Buffer.');
  }

  if (hashString.length < prefixLength + suffixLength) {
    throw new Error('Hash is too short to abbreviate.');
  }

  const prefix = hashString.slice(0, prefixLength);
  const suffix = hashString.slice(-suffixLength);

  return `0x${prefix}...${suffix}`;
}
