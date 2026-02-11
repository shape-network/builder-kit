# Builder Kit

Onchain starter for Shape with a minimal monorepo:
- `apps/web` (Next.js + wagmi + WalletConnect/injected connectors)
- `packages/contract` (Hardhat)

<table width="100%">
  <tr>
    <td width="50%"><img src="./apps/web/public/lp-1.png" alt="Builder Kit Screenshot 1" width="100%"/></td>
    <td width="50%"><img src="./apps/web/public/lp-2.png" alt="Builder Kit Screenshot 2" width="100%"/></td>
  </tr>
</table>

Live site: [builder-kit.vercel.app](https://builder-kit.vercel.app/)

## Prerequisites

- Node `v20.18.0` (`cat .nvmrc`)
- Bun `1.3.6+`
- WalletConnect project ID
- Alchemy API key
- Funded deployer wallet for Shape Sepolia/Mainnet deploys

```bash
nvm use
bun --version
```

## Install

```bash
git clone https://github.com/shape-network/builder-kit.git
cd builder-kit
bun install
```

## Configure: Web App

```bash
cp apps/web/.env-example apps/web/.env
```

Required values in `apps/web/.env`:
- `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`
- `NEXT_PUBLIC_ALCHEMY_KEY`
- `NEXT_PUBLIC_CHAIN_ID` (`11011` for Shape Sepolia, `360` for Shape Mainnet)

## Run: Web App

```bash
bun dev
```

Open `http://localhost:3000`.

Other web commands:

```bash
bun build
bun start
bun lint
bun lint:fix
bun type-check
bun format
bun format:check
```

## Configure: Contract Package

```bash
cp packages/contract/.env-example packages/contract/.env
```

Set in `packages/contract/.env`:
- `DEPLOYER_PRIVATE_KEY` (required for remote deploys)
- `SHAPE_SEPOLIA_RPC_URL` and/or `SHAPE_MAINNET_RPC_URL`
- `SHAPE_EXPLORER_API_KEY` (optional, for verify)
- `INITIAL_MESSAGE` (optional constructor arg override)

## Build/Test/Deploy: Contracts

Compile and test:

```bash
bun contracts:compile
bun contracts:test
```

`bun contracts:compile` also regenerates deployment artifacts for the web app and runs Wagmi CLI codegen.

Deploy locally (Hardhat network):

```bash
bun --filter=@builder-kit/contract run deploy
```

This uses Hardhat Ignition (`packages/contract/ignition/modules/HelloShape.js`).

Deploy to Shape Sepolia:

```bash
bun contracts:deploy:shape-sepolia
```

Sepolia deploy also regenerates deployment artifacts.

Deploy to Shape Mainnet:

```bash
bun --filter=@builder-kit/contract run deploy:shape-mainnet
```

Mainnet deploy also regenerates deployment artifacts.

Manual artifact generation:

```bash
bun contracts:artifact
```

Manual Wagmi generation:

```bash
bun wagmi:generate
```

Verify on Shape explorer:

```bash
CONTRACT_ADDRESS=0xYourContractAddress \
  bun --filter=@builder-kit/contract run verify --network shapeSepolia
```

For mainnet verify, switch network flag to `shapeMainnet`.

## Root Command Reference

- `bun dev`: run `apps/web` dev server
- `bun build`: production build for `apps/web`
- `bun start`: start built `apps/web`
- `bun lint`: lint `apps/web`
- `bun type-check`: type-check `apps/web`
- `bun contracts:compile`: compile Solidity contracts
- `bun contracts:test`: run Hardhat tests
- `bun contracts:deploy:shape-sepolia`: deploy sample contract to Shape Sepolia
- `bun contracts:artifact`: regenerate deployment artifacts consumed by the web app
- `bun wagmi:generate`: regenerate Wagmi typed ABI/hooks from Hardhat artifacts

## Contract Debug Page

`/debug/contracts` reads deployment artifacts and interacts with `HelloShape`.

- shows explicit deployment mismatch errors when chain/artifacts are out of sync
- reads current message/owner
- writes `setMessage` from connected wallet

Generated outputs:
- `packages/contract/deployments/deployed-contracts.json` (addresses)
- `apps/web/lib/contracts/generated/deployed-contracts.ts` (typed addresses)
- `apps/web/lib/contracts/generated/wagmi.ts` (Wagmi CLI ABI/hooks)

## Vercel Deploy (Monorepo)

If deploying from Git integration in Vercel dashboard:
- Framework preset: Next.js
- Root Directory: `apps/web`
- Add env vars:
  - `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`
  - `NEXT_PUBLIC_ALCHEMY_KEY`
  - `NEXT_PUBLIC_CHAIN_ID`

CLI path:

```bash
vercel link --cwd apps/web
vercel env add NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID production
vercel env add NEXT_PUBLIC_ALCHEMY_KEY production
vercel env add NEXT_PUBLIC_CHAIN_ID production
vercel --prod --cwd apps/web
```

## Project Structure

```text
.
├── apps/
│   └── web/
│       ├── app/
│       ├── components/
│       ├── hooks/
│       ├── lib/
│       └── public/
├── packages/
│   └── contract/
│       ├── contracts/
│       ├── deployments/
│       ├── ignition/
│       ├── scripts/
│       └── test/
├── turbo.json
└── package.json
```

## Troubleshooting

- `No projectId found`:
  - missing `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` in `apps/web/.env` (or Vercel envs)
- Hardhat warns Node version unsupported:
  - use Node 20 (`nvm use`)
- `HH501` compiler download errors:
  - network access blocked when Hardhat tries to fetch solc

## Support

- [Shape docs](https://docs.shape.network)
- [Shape Discord](http://discord.com/invite/shape-l2)
- [wagmi docs](https://wagmi.sh)
- [wagmi core getting started](https://wagmi.sh/core/getting-started)
- [wagmi cli docs](https://wagmi.sh/cli)
- [Hardhat docs](https://hardhat.org/docs)
