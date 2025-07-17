import { alchemy } from '@/lib/clients';
import { NextRequest, NextResponse } from 'next/server';
import { Address, isAddress } from 'viem';
import { z } from 'zod';

const getNftsSchema = z.object({
  address: z.string().refine((val) => isAddress(val), {
    message: 'Invalid Ethereum address format',
  }),
});

/**
 * Example API route to fetch NFTs for a user
 * POST /api/get-nfts
 * Body: { address: "0x..." }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = getNftsSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validation.error.errors,
        },
        { status: 400 }
      );
    }

    const { address } = validation.data;

    const nfts = await alchemy.nft.getNftsForOwner(address as Address, {
      contractAddresses: ['example-contract-address'],
    });

    return NextResponse.json({
      success: true,
      data: nfts,
      address,
    });
  } catch (error) {
    console.error('Error fetching NFTs:', error);
    return NextResponse.json({ error: 'Failed to fetch NFTs' }, { status: 500 });
  }
}
