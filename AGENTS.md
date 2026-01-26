# Repository Guidelines

## Project Structure & Module Organization
- `app/` contains Next.js App Router routes/layouts; `app/api/` houses API routes.
- `components/` stores shared UI and providers; `components/ui/` is the shadcn/ui set.
- `hooks/` holds custom React hooks (example: `use-balance.ts`).
- `lib/` is for configs, clients, and utilities.
- `public/` contains static assets.
- Root configs include `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`, and `components.json`.

## Build, Test, and Development Commands
Use Bun (see `package.json`):
- `bun dev`: start the Next.js dev server with Turbopack.
- `bun build`: create a production build.
- `bun start`: run the production server after a build.
- `bun lint` / `bun lint:fix`: lint and auto-fix.
- `bun type-check`: TypeScript type checking.
- `bun format` / `bun format:check`: Prettier formatting and validation.

## Coding Style & Naming Conventions
- TypeScript + React with App Router conventions.
- Formatting via Prettier: 2-space indent, single quotes, semicolons, 100-char line width; Tailwind classes are sorted by `prettier-plugin-tailwindcss`.
- ESLint is required; keep components small and composable.
- File naming uses kebab-case (`wallet-connect.tsx`, `theme-toggle.tsx`) and hooks follow `use-*.ts`.

## Testing Guidelines
- No automated test suite is configured yet. Use `bun lint` and `bun type-check`, then verify flows in the running app.
- If you add tests, update `package.json` scripts and document the command here.

## Commit & Pull Request Guidelines
- Commit messages are short and imperative (examples from history: “update next”, “add nft lookup”).
- PRs should include a brief what/why summary, UI screenshots for visual changes, and notes on env/config updates.
- Link related issues and call out new environment variables explicitly.

## Configuration & Secrets
- Copy `.env-example` to `.env` and set `NEXT_PUBLIC_ALCHEMY_KEY`, `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`, and `NEXT_PUBLIC_CHAIN_ID` (11011 for Shape Sepolia, 360 for mainnet).
- Never commit real keys or secrets.
