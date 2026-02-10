# @builder-kit/contract

Hardhat workspace for Shape contracts.

## Setup

```bash
cp .env-example .env
```

Set at least:
- `DEPLOYER_PRIVATE_KEY`
- `SHAPE_SEPOLIA_RPC_URL` (chain `11011`) or `SHAPE_MAINNET_RPC_URL` (chain `360`)

## Commands

```bash
bun run compile
bun run test
bun run deploy
bun run deploy:shape-sepolia
bun run deploy:shape-mainnet
CONTRACT_ADDRESS=0x... bun run verify --network shapeSepolia
```
