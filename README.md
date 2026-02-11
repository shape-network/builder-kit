# Builder Kit

Onchain starter for Shape with a minimal monorepo:
- `apps/web` (Next.js + wagmi)
- `packages/contract` (Hardhat)

<table width="100%">
  <tr>
    <td width="50%"><img src="./apps/web/public/lp-1.png" alt="Builder Kit Screenshot 1" width="100%"/></td>
    <td width="50%"><img src="./apps/web/public/lp-2.png" alt="Builder Kit Screenshot 2" width="100%"/></td>
  </tr>
</table>

Live site: [builder-kit.vercel.app](https://builder-kit.vercel.app/)

Start here: [GET_STARTED_SHAPE.md](./GET_STARTED_SHAPE.md)

## Root Command Reference

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

## Contract Debug Page

`/debug/contracts` reads deployment artifacts and interacts with `HelloShape`.

- reads current message + owner
- writes `setMessage`
- shows deployment mismatch errors when chain/artifacts are out of sync

Generated outputs:
- `packages/contract/deployments/deployed-contracts.json` (addresses)
- `apps/web/lib/contracts/generated/deployed-contracts.ts` (typed addresses)
- `apps/web/lib/contracts/generated/wagmi.ts` (Wagmi CLI ABI/hooks)

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

## Support

- [Shape docs](https://docs.shape.network)
- [Shape Discord](http://discord.com/invite/shape-l2)
- [wagmi docs](https://wagmi.sh)
- [wagmi core getting started](https://wagmi.sh/core/getting-started)
- [wagmi cli docs](https://wagmi.sh/cli)
- [Hardhat docs](https://hardhat.org/docs)
