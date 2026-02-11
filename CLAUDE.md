# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Builder Kit is a monorepo starter template for building dApps on Shape Network (EVM-compatible L2).
- `apps/web`: Next.js + wagmi frontend
- `packages/contract`: Hardhat workspace

## Commands

```bash
bun run dev          # Start dev server with Turbopack
bun run build        # Production build
bun run start        # Start production server
bun run lint         # ESLint
bun run lint:fix     # ESLint with auto-fix
bun run type-check   # TypeScript type checking
bun run format       # Prettier format
bun run format:check # Prettier check
bun run contracts:compile         # Compile contracts
bun run contracts:test            # Run contract tests
bun run contracts:deploy:shape-sepolia # Deploy to Shape Sepolia
bun run contracts:artifact        # Regenerate deployment artifacts
bun run wagmi:generate            # Regenerate wagmi generated contract bindings
```

## Environment Variables

Copy `apps/web/.env-example` to `apps/web/.env` and configure:

- `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` - WalletConnect project ID
- `NEXT_PUBLIC_ALCHEMY_KEY` - Alchemy API key
- `NEXT_PUBLIC_CHAIN_ID` - 11011 (Shape Sepolia) or 360 (Shape Mainnet)

`NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` is optional if you only want injected wallets.

## Architecture

### Web3 Stack

- **wagmi + connectors**: Wallet connection and transaction management (`apps/web/lib/web3.ts`)
  - `injected()` connector
  - `walletConnect()` connector (enabled only when `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` is set)
- **viem**: Low-level blockchain interactions
- **Alchemy SDK**: NFT queries and enhanced RPC (`apps/web/lib/clients.ts`)
- Chain config determined by `NEXT_PUBLIC_CHAIN_ID` at build time

### Provider Hierarchy

`apps/web/components/providers.tsx` wraps the app:

```
ThemeProvider (next-themes)
  └─ WagmiProvider
      └─ QueryClientProvider (TanStack Query)
```

### UI Components

- Shadcn/ui (new-york style) in `apps/web/components/ui/`
- `cn()` utility in `apps/web/lib/utils.ts` for class merging

### Path Aliases

`@/*` maps to `apps/web` project root (configured in `apps/web/tsconfig.json`)

### Supported Chains

- Shape Mainnet (360)
- Shape Sepolia (11011)
- Ethereum Mainnet (for ENS resolution)
