// app/api/mint-nft/route.ts
// get user wallet address from wallet connect modal
// check if the user already has the nft
// if they do, tell them they already have the nft
// if they don't, mint the nft for the user and send to their address
// return the nft image url, token id, and token address

import { NextRequest, NextResponse } from 'next/server';
import { isAddress } from 'viem';
import { z } from 'zod';

const mintNftSchema = z.object({
    address: z.string().refine((val) => isAddress(val), {
        message: 'Invalid Ethereum address format',
    }),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const validation = mintNftSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                {
                    error: 'Invalid address',
                    details: validation.error.flatten().fieldErrors,
                },
                { status: 400 }
            );
        }

        const { address } = validation.data;

        // TODO: Add actual NFT minting logic here
        // For now, return a mock response

        return NextResponse.json({
            success: true,
            message: 'NFT minted successfully!',
            tokenId: '1',
            tokenAddress: '0x...', // Replace with actual contract address
            imageUrl: '/shape wiz.png',
            recipient: address,
        });

    } catch (error) {
        console.error('Error minting NFT:', error);
        return NextResponse.json(
            { error: 'Failed to mint NFT' },
            { status: 500 }
        );
    }
}