'use client';

import { config } from '@/lib/config';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { http } from 'viem';
import { mainnet, shape, shapeSepolia } from 'viem/chains';

export const wagmiConfig = getDefaultConfig({
  appName: 'Builder Kit',
  ssr: true,
  projectId: config.walletConnectProjectId,
  chains: [shape, shapeSepolia, mainnet],
  transports: {
    [shape.id]: http(`https://shape-mainnet.g.alchemy.com/v2/${config.alchemyKey}`, {
      batch: true,
    }),
    [shapeSepolia.id]: http(`https://shape-sepolia.g.alchemy.com/v2/${config.alchemyKey}`, {
      batch: true,
    }),
    [mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${config.alchemyKey}`, {
      batch: true,
    }),
  },
});
