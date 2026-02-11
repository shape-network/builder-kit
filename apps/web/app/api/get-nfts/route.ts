import { alchemy } from '@/lib/clients';
import { NextRequest, NextResponse } from 'next/server';
import { Address, isAddress } from 'viem';
import { z } from 'zod';

/**
 * TEMPLATE CUSTOMIZATION POINT:
 * Replace with real NFT collection contract addresses to scope results.
 * Keep placeholder values to fetch all NFTs for the wallet.
 */
const TEMPLATE_CONTRACT_ADDRESSES = ['example-contract-address'];

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
          details: validation.error.issues,
        },
        { status: 400 }
      );
    }

    const { address } = validation.data;
    const contractAddresses = TEMPLATE_CONTRACT_ADDRESSES.filter((contractAddress) =>
      isAddress(contractAddress),
    );

    const nfts = await alchemy.nft.getNftsForOwner(address as Address, {
      contractAddresses: contractAddresses.length > 0 ? contractAddresses : undefined,
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
