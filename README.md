# Builder Kit

Onchain starter for Shape with a minimal monorepo:
- `apps/web` (Next.js + wagmi)
- `packages/contract` (Hardhat)

Live site: [builder-kit.vercel.app](https://builder-kit.vercel.app/)

## Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/shape-network/builder-kit&root-directory=apps%2Fweb)

Set these project env vars in Vercel after import:
- `NEXT_PUBLIC_ALCHEMY_KEY`
- `NEXT_PUBLIC_CHAIN_ID` (`11011` or `360`)
- `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` (optional)

## Quick Start (15-Min First Tx)

### Prerequisites

- Node `v20.18.0` (`cat .nvmrc`)
- Bun `1.3.6+`
- `NEXT_PUBLIC_ALCHEMY_KEY`
- `DEPLOYER_PRIVATE_KEY` (funded on Shape Sepolia)

### 1) Install

```bash
nvm use
bun install
```

### 2) Configure env

```bash
cp apps/web/.env-example apps/web/.env
cp packages/contract/.env-example packages/contract/.env
```

Required values:
- `apps/web/.env`
  - `NEXT_PUBLIC_ALCHEMY_KEY`
  - `NEXT_PUBLIC_CHAIN_ID=11011`
  - `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` (optional)
- `packages/contract/.env`
  - `DEPLOYER_PRIVATE_KEY`
  - `SHAPE_SEPOLIA_RPC_URL` (default is fine)

### 3) Build + test contracts

```bash
bun contracts:compile
bun contracts:test
```

### 4) Deploy to Shape Sepolia

```bash
bun contracts:deploy:shape-sepolia
```

### 5) Run web app

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000), then `/debug/contracts`.

### 6) Send first tx

1. Connect wallet.
2. Switch to Shape Sepolia (`11011`).
3. Enter a new message on `/debug/contracts`.
4. Click `Set Message` and confirm.
5. Wait for `Confirmed`.

## Common Failures

### Missing keys
- Symptom: reads/writes fail.
- Fix: set `NEXT_PUBLIC_ALCHEMY_KEY` and `DEPLOYER_PRIVATE_KEY`.

### Wrong chain
- Symptom: deployment mismatch error.
- Fix: wallet chain + `NEXT_PUBLIC_CHAIN_ID` must both be `11011`.

### Stale artifacts
- Symptom: missing deployment after deploy.
- Fix:

```bash
bun contracts:artifact
```

If still missing:

```bash
bun contracts:deploy:shape-sepolia
```

## Command Reference

- `bun dev` run web app (`apps/web`)
- `bun build` build web app
- `bun start` start built web app
- `bun lint` lint web app
- `bun type-check` type-check web app
- `bun contracts:compile` compile + regenerate contract artifacts
- `bun contracts:test` run contract tests
- `bun contracts:deploy:shape-sepolia` deploy HelloShape to Shape Sepolia
- `bun contracts:artifact` regenerate deployment artifacts consumed by web
- `bun wagmi:generate` regenerate wagmi typed ABI/hooks

## Support

- [Shape docs](https://docs.shape.network)
- [Shape Discord](http://discord.com/invite/shape-l2)
- [@williamhzo](https://x.com/williamhzo)
