import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Builder Kit - Shape Network',
    short_name: 'Builder Kit',
    description:
      'A modern & minimal web3 starter kit for building decentralized applications with Next.js, Wagmi, and Shape Network',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
  };
}
