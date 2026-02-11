# Get Started on Shape (15-Min First Tx)

Command-first setup for this repo with Bun only.

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

Set required values:
- `apps/web/.env`
  - `NEXT_PUBLIC_ALCHEMY_KEY`
  - `NEXT_PUBLIC_CHAIN_ID=11011` (Shape Sepolia)
- `packages/contract/.env`
  - `DEPLOYER_PRIVATE_KEY`
  - `SHAPE_SEPOLIA_RPC_URL` (default in example is fine)

## 3) Run contracts locally

```bash
bun contracts:compile
bun contracts:test
```

This regenerates:
- `packages/contract/deployments/deployed-contracts.json`
- `apps/web/lib/contracts/generated/deployed-contracts.ts`
- `apps/web/lib/contracts/generated/wagmi.ts`

## 4) Deploy to Shape Sepolia

```bash
bun contracts:deploy:shape-sepolia
```

## 5) Run web app

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000), then go to `/debug/contracts`.

## 6) Send first tx

1. Connect wallet (injected or WalletConnect if `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` is set).
2. Switch wallet to Shape Sepolia (`11011`).
3. In `/debug/contracts`, enter a new message.
4. Submit `Set Message` and confirm in wallet.
5. Wait for receipt status `Confirmed`.

## Common failures

### Missing keys
- Symptom: wallet/actions fail or reads fail.
- Fix: verify `NEXT_PUBLIC_ALCHEMY_KEY` and `DEPLOYER_PRIVATE_KEY` are set.

### Wrong chain
- Symptom: deployment mismatch on `/debug/contracts`.
- Fix: switch wallet to chain `11011`, and ensure `NEXT_PUBLIC_CHAIN_ID=11011`.

### Stale deployment artifacts
- Symptom: debug page shows missing deployment after deploy.
- Fix:

```bash
bun contracts:artifact
```

If needed, redeploy then regenerate:

```bash
bun contracts:deploy:shape-sepolia
```
