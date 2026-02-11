'use client';

import { config } from '@/lib/config';
import { http } from 'viem';
import { mainnet, shape, shapeSepolia } from 'viem/chains';
import { createConfig } from 'wagmi';
import { injected, walletConnect } from 'wagmi/connectors';

const appOrigin =
  typeof window !== 'undefined' ? window.location.origin : 'https://builder-kit.vercel.app';

const connectors =
  typeof window !== 'undefined'
    ? [
        injected(),
        ...(config.walletConnectProjectId
          ? [
              walletConnect({
                projectId: config.walletConnectProjectId,
                showQrModal: true,
                metadata: {
                  name: 'Builder Kit',
                  description: 'Builder Kit on Shape',
                  url: appOrigin,
                  icons: [`${appOrigin}/favicon.ico`],
                },
              }),
            ]
          : []),
      ]
    : [];

export const wagmiConfig = createConfig({
  chains: [shape, shapeSepolia, mainnet],
  connectors,
  ssr: true,
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
