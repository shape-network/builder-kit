export const config = {
  chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
  alchemyKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY as string,
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string,
} as const;
