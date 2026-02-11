# Get Started on Shape (15-Min First Tx)

Single runbook for setup + first transaction.

## Prerequisites

- Node `v20.18.0` (`cat .nvmrc`)
- Bun `1.3.6+`
- `NEXT_PUBLIC_ALCHEMY_KEY`
- `DEPLOYER_PRIVATE_KEY` (funded on Shape Sepolia)

## 1) Install

```bash
nvm use
bun install
```

## 2) Configure env

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

## 3) Build + test contracts

```bash
bun contracts:compile
bun contracts:test
```

## 4) Deploy to Shape Sepolia

```bash
bun contracts:deploy:shape-sepolia
```

## 5) Run web app

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000), then `/debug/contracts`.

## 6) Send first tx

1. Connect wallet.
2. Switch to Shape Sepolia (`11011`).
3. Enter a new message on `/debug/contracts`.
4. Click `Set Message` and confirm.
5. Wait for `Confirmed`.

## Common failures

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
