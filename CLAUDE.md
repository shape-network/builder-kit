# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Builder Kit is a web3 starter template for building dApps on Shape Network (EVM-compatible L2). It provides pre-configured wallet connection, RPC endpoints, and UI components.

## Commands

```bash
bun dev          # Start dev server with Turbopack
bun build        # Production build
bun lint         # ESLint
bun lint:fix     # ESLint with auto-fix
bun type-check   # TypeScript type checking
bun format       # Prettier format
bun format:check # Prettier check
```

## Environment Variables

Copy `.env-example` to `.env` and configure:
- `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` - WalletConnect project ID
- `NEXT_PUBLIC_ALCHEMY_KEY` - Alchemy API key
- `NEXT_PUBLIC_CHAIN_ID` - 11011 (Shape Sepolia) or 360 (Shape Mainnet)

## Architecture

### Web3 Stack
- **wagmi + RainbowKit**: Wallet connection and transaction management (`lib/web3.ts`)
- **viem**: Low-level blockchain interactions
- **Alchemy SDK**: NFT queries and enhanced RPC (`lib/clients.ts`)
- Chain config determined by `NEXT_PUBLIC_CHAIN_ID` at build time

### Provider Hierarchy
`components/providers.tsx` wraps the app:
```
ThemeProvider (next-themes)
  └─ WagmiProvider
      └─ QueryClientProvider (TanStack Query)
          └─ RainbowKitProvider
```

### UI Components
- Shadcn/ui (new-york style) in `components/ui/`
- Add components via `bunx shadcn@latest add <component>`
- `cn()` utility in `lib/utils.ts` for class merging

### Path Aliases
`@/*` maps to project root (configured in tsconfig.json)

### Supported Chains
- Shape Mainnet (360)
- Shape Sepolia (11011)
- Ethereum Mainnet (for ENS resolution)
