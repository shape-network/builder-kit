# @builder-kit/contract

Hardhat workspace for Shape contracts.

Default deploy flow uses Hardhat Ignition (recommended by Hardhat docs).
Access control baseline uses OpenZeppelin `Ownable2Step`.

## Setup

```bash
cp .env-example .env
```

Set at least:
- `DEPLOYER_PRIVATE_KEY`
- `SHAPE_SEPOLIA_RPC_URL` (chain `11011`) or `SHAPE_MAINNET_RPC_URL` (chain `360`)
- `INITIAL_MESSAGE` (optional, defaults to `Hello Shape`)

## Commands

```bash
bun run compile
bun run test
bun run deploy
bun run deploy:shape-sepolia
bun run deploy:shape-mainnet
bun run generate:artifact
CONTRACT_ADDRESS=0x... bun run verify --network shapeSepolia
```

`compile` and remote deploy scripts regenerate deployment artifacts and run Wagmi CLI codegen for `apps/web`.
