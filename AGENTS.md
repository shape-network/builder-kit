# Repository Guidelines

## Project Structure & Module Organization

- `apps/web/` contains the Next.js app.
- `apps/web/app/` contains App Router routes/layouts; `apps/web/app/api/` houses API routes.
- `apps/web/components/` stores shared UI and providers; `apps/web/components/ui/` is the shadcn/ui set.
- `apps/web/hooks/` holds custom React hooks (example: `use-balance.ts`).
- `apps/web/lib/` is for configs, clients, and utilities.
- `apps/web/public/` contains static assets.
- `packages/contract/` is the Hardhat contract workspace.
- Web app configs live in `apps/web/` (`next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`, `components.json`).
- Monorepo orchestration is in root `package.json` and `turbo.json`.

## Build, Test, and Development Commands

Use Bun (see `package.json`):

- `bun run dev`: start the web app dev server (`apps/web`) with Turbopack.
- `bun run build`: create a production build for the web app.
- `bun run start`: run the web app production server after build.
- `bun run lint` / `bun run lint:fix`: lint and auto-fix the web app.
- `bun run type-check`: TypeScript type checking for the web app.
- `bun run format` / `bun run format:check`: Prettier formatting and validation for the web app.
- `bun run contracts:compile`: compile contracts in `packages/contract`.
- `bun run contracts:test`: run contract tests.
- `bun run contracts:deploy:shape-sepolia`: deploy contracts to Shape Sepolia.
- `bun run contracts:artifact`: regenerate deployment artifacts consumed by `apps/web`.
- `bun run wagmi:generate`: regenerate Wagmi typed ABI/hooks for `apps/web`.

## Coding Style & Naming Conventions

- TypeScript + React with App Router conventions.
- Formatting via Prettier: 2-space indent, single quotes, semicolons, 100-char line width; Tailwind classes are sorted by `prettier-plugin-tailwindcss`.
- ESLint is required; keep components small and composable.
- File naming uses kebab-case (`wallet-connect.tsx`, `theme-toggle.tsx`) and hooks follow `use-*.ts`.

## Testing Guidelines

- Web app checks: `bun lint` and `bun type-check`, then verify flows in the running app.
- Contract checks: `bun contracts:compile` and `bun contracts:test`.

## Commit & Pull Request Guidelines

- Commit messages are short and imperative (examples from history: “update next”, “add nft lookup”).
- PRs should include a brief what/why summary, UI screenshots for visual changes, and notes on env/config updates.
- Link related issues and call out new environment variables explicitly.

## Configuration & Secrets

- Copy `apps/web/.env-example` to `apps/web/.env` and set `NEXT_PUBLIC_ALCHEMY_KEY`, `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`, and `NEXT_PUBLIC_CHAIN_ID` (11011 for Shape Sepolia, 360 for mainnet).
- Copy `packages/contract/.env-example` to `packages/contract/.env` and set `DEPLOYER_PRIVATE_KEY` plus Shape RPC URLs before remote deploys.
- Never commit real keys or secrets.
