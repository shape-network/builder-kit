import { defineConfig } from '@wagmi/cli';
import { hardhat, react } from '@wagmi/cli/plugins';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

type DeploymentFile = {
  contracts: Record<string, { HelloShape?: { address: string | null } }>;
};

function helloShapeDeployments(): Record<number, `0x${string}`> {
  const deploymentPath = resolve(
    __dirname,
    '../../packages/contract/deployments/deployed-contracts.json',
  );

  if (!existsSync(deploymentPath)) {
    return {};
  }

  const payload = JSON.parse(readFileSync(deploymentPath, 'utf8')) as DeploymentFile;

  return Object.fromEntries(
    Object.entries(payload.contracts)
      .map(([chainId, contracts]) => {
        const address = contracts.HelloShape?.address;
        if (!address) {
          return null;
        }

        return [Number(chainId), address as `0x${string}`] as const;
      })
      .filter((entry): entry is readonly [number, `0x${string}`] => entry !== null),
  );
}

export default defineConfig({
  out: 'lib/contracts/generated/wagmi.ts',
  plugins: [
    hardhat({
      project: '../../packages/contract',
      include: ['contracts/HelloShape.sol/**'],
      deployments: {
        HelloShape: helloShapeDeployments(),
      },
    }),
    react(),
  ],
});
