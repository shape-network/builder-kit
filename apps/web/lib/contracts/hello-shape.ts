import { deployedContracts } from '@/lib/contracts/generated/deployed-contracts';
import { helloShapeAbi } from '@/lib/contracts/generated/wagmi';
import type { Address } from 'viem';

type SupportedChainId = keyof typeof deployedContracts;

type HelloShapeDeployment = {
  address: Address;
  abi: typeof helloShapeAbi;
};

const SUPPORTED_CHAIN_LABELS: Record<string, string> = {
  '11011': 'Shape Sepolia',
  '360': 'Shape Mainnet',
};

function isSupportedChainId(chainId: number): chainId is number {
  return Object.hasOwn(deployedContracts, String(chainId));
}

export function getHelloShapeDeployment(chainId: number): HelloShapeDeployment | null {
  if (!isSupportedChainId(chainId)) {
    return null;
  }

  const chain = deployedContracts[String(chainId) as SupportedChainId];
  const contract = chain.HelloShape;

  if (!contract?.address) {
    return null;
  }

  return {
    address: contract.address as Address,
    abi: helloShapeAbi,
  };
}

export function getHelloShapeDeploymentError(chainId: number): string | null {
  if (!isSupportedChainId(chainId)) {
    return `Unsupported chain ${chainId}. Switch to Shape Sepolia (11011) or Shape Mainnet (360).`;
  }

  const contract = deployedContracts[String(chainId) as SupportedChainId].HelloShape;

  if (contract.address) {
    return null;
  }

  const label = SUPPORTED_CHAIN_LABELS[String(chainId)] ?? `chain ${chainId}`;
  const deployCommand = chainId === 11011
    ? 'bun contracts:deploy:shape-sepolia'
    : 'bun --filter=@builder-kit/contract run deploy:shape-mainnet';

  return `No HelloShape deployment for ${label}. Run \`${deployCommand}\` and then \`bun contracts:artifact\`.`;
}

export function assertHelloShapeDeployment(chainId: number): HelloShapeDeployment {
  const deployment = getHelloShapeDeployment(chainId);
  if (deployment) {
    return deployment;
  }

  const error = getHelloShapeDeploymentError(chainId);
  throw new Error(error ?? `Missing HelloShape deployment for chain ${chainId}.`);
}
