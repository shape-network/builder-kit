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

## Ethereum Skills (ethskills)

Ethereum development knowledge from [ethskills](https://github.com/austintgriffith/ethskills) is installed at `.claude/skills/ethskills/`. These correct common AI blind spots about gas costs, L2s, standards, and tooling.

Read the relevant skill file before starting any Ethereum development task. Each skill is a `SKILL.md` file in its directory.

| Skill | Path | Use when |
|-------|------|----------|
| Ship | `ship/` | Planning dApp architecture, choosing what goes onchain vs offchain |
| Why Ethereum | `why/` | User asks "why blockchain?", needs current protocol stats, ERC-8004/x402 |
| Gas & Costs | `gas/` | Estimating costs, setting gas params, comparing L1 vs L2 |
| Wallets | `wallets/` | Key management, Safe multisig, EIP-7702, account abstraction |
| Layer 2s | `l2s/` | Choosing an L2, deployment differences, bridging |
| Standards | `standards/` | ERC-20/721/1155, ERC-8004, x402, EIP-7702, EIP-3009 |
| Tools | `tools/` | Dev environment setup, Foundry, Blockscout MCP, RPCs |
| Building Blocks | `building-blocks/` | DeFi composability, Uniswap V4 hooks, flash loans, vaults |
| Orchestration | `orchestration/` | SE2 three-phase build system, agent commerce flow |
| Addresses | `addresses/` | Verified contract addresses for Uniswap, Aave, Chainlink, etc. |
| Concepts | `concepts/` | Incentive design, "nothing is automatic", randomness |
| Security | `security/` | Reentrancy, decimals, oracles, MEV, proxy patterns, checklists |
| Testing | `testing/` | Foundry unit/fuzz/fork/invariant testing |
| Indexing | `indexing/` | Events, The Graph, Dune, onchain data queries |
| Frontend UX | `frontend-ux/` | Button flows, address display, loading states, approval patterns |
| Frontend Playbook | `frontend-playbook/` | IPFS deploy, Vercel config, ENS subdomains, production checklist |
| QA | `qa/` | Pre-ship audit checklist for dApps |
| Audit | `audit/` | 500+ item smart contract security audit system |

All skills also available at `https://ethskills.com/<skill>/SKILL.md`.
