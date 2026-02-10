'use client';

import {
  getHelloShapeDeployment,
  getHelloShapeDeploymentError,
} from '@/lib/contracts/hello-shape';
import { useMemo } from 'react';
import { useChainId } from 'wagmi';

export function useHelloShapeContract() {
  const chainId = useChainId();

  return useMemo(() => {
    return {
      chainId,
      deployment: getHelloShapeDeployment(chainId),
      deploymentError: getHelloShapeDeploymentError(chainId),
    };
  }, [chainId]);
}
