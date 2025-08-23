import { config } from '@/lib/config';
import '@rainbow-me/rainbowkit/styles.css';
import { Alchemy, Network } from 'alchemy-sdk';
import { createPublicClient, http } from 'viem';
import { shape, shapeSepolia } from 'viem/chains';

export const alchemy = new Alchemy({
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network: config.chainId === shape.id ? Network.SHAPE_MAINNET : Network.SHAPE_SEPOLIA,
});

export function rpcClient() {
  const chainId = config.chainId;
  const chain = chainId === shape.id ? shape : shapeSepolia;
  const rootUrl = chainId === shape.id ? 'shape-mainnet' : 'shape-sepolia';

  return createPublicClient({
    chain,
    transport: http(`https://${rootUrl}.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`),
    batch: {
      multicall: true,
    },
  });
}
