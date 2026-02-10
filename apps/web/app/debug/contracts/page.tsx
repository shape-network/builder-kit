'use client';

import { WalletConnect } from '@/components/wallet-connect';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useHelloShapeContract } from '@/hooks/use-hello-shape';
import { AlertTriangleIcon, CheckCircle2Icon, Loader2Icon } from 'lucide-react';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { zeroAddress } from 'viem';
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

import { deployedContracts } from '@/lib/contracts/generated/deployed-contracts';

const fallbackContract = deployedContracts['11011'].HelloShape;

export default function DebugContractsPage() {
  const { address, isConnected } = useAccount();
  const { chainId, deployment, deploymentError } = useHelloShapeContract();

  const [nextMessage, setNextMessage] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [submittedHash, setSubmittedHash] = useState<`0x${string}` | undefined>();

  const contractForHooks = useMemo(() => {
    return (
      deployment ?? {
        address: zeroAddress,
        abi: fallbackContract.abi,
      }
    );
  }, [deployment]);

  const deploymentMissing = !deployment;

  const messageRead = useReadContract({
    address: contractForHooks.address,
    abi: contractForHooks.abi,
    functionName: 'message',
    query: {
      enabled: !deploymentMissing,
    },
  });

  const ownerRead = useReadContract({
    address: contractForHooks.address,
    abi: contractForHooks.abi,
    functionName: 'owner',
    query: {
      enabled: !deploymentMissing,
    },
  });

  const write = useWriteContract();

  const receipt = useWaitForTransactionReceipt({
    hash: submittedHash,
    query: {
      enabled: Boolean(submittedHash),
    },
  });

  useEffect(() => {
    if (!receipt.isSuccess) {
      return;
    }

    messageRead.refetch();
  }, [receipt.isSuccess, messageRead]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    if (!deployment) {
      setFormError(deploymentError ?? 'Missing deployment for selected chain.');
      return;
    }

    if (!isConnected) {
      setFormError('Connect a wallet before writing to the contract.');
      return;
    }

    const trimmedMessage = nextMessage.trim();
    if (!trimmedMessage) {
      setFormError('Message cannot be empty.');
      return;
    }

    try {
      const hash = await write.writeContractAsync({
        address: deployment.address,
        abi: deployment.abi,
        functionName: 'setMessage',
        args: [trimmedMessage],
      });

      setNextMessage('');
      setSubmittedHash(hash);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setFormError(message);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Contract Debug</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Read and write HelloShape using generated deployment artifacts.
          </p>
        </div>
        <WalletConnect />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Runtime</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            <span className="text-muted-foreground">Connected wallet:</span>{' '}
            {isConnected && address ? address : 'Not connected'}
          </p>
          <p>
            <span className="text-muted-foreground">Active chain:</span> {chainId}
          </p>
          <p>
            <span className="text-muted-foreground">Deployment address:</span>{' '}
            {deployment?.address ?? 'Missing'}
          </p>
        </CardContent>
      </Card>

      {deploymentError ? (
        <Alert variant="destructive">
          <AlertTriangleIcon className="h-4 w-4" />
          <AlertTitle>Deployment mismatch</AlertTitle>
          <AlertDescription>{deploymentError}</AlertDescription>
        </Alert>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>Read</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            <span className="text-muted-foreground">Current message:</span>{' '}
            {messageRead.isLoading ? 'Loading...' : (messageRead.data as string | undefined) ?? '-'}
          </p>
          <p>
            <span className="text-muted-foreground">Owner:</span>{' '}
            {ownerRead.isLoading ? 'Loading...' : (ownerRead.data as string | undefined) ?? '-'}
          </p>
          {messageRead.error ? (
            <Alert variant="destructive">
              <AlertTriangleIcon className="h-4 w-4" />
              <AlertTitle>Read error</AlertTitle>
              <AlertDescription>{messageRead.error.message}</AlertDescription>
            </Alert>
          ) : null}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Write</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-3">
            <Input
              placeholder="New message"
              value={nextMessage}
              onChange={(event) => setNextMessage(event.target.value)}
              disabled={deploymentMissing || write.isPending || receipt.isLoading}
            />
            <Button
              type="submit"
              disabled={deploymentMissing || write.isPending || receipt.isLoading}
            >
              {write.isPending || receipt.isLoading ? (
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Set Message
            </Button>
          </form>

          {formError ? (
            <Alert variant="destructive" className="mt-3">
              <AlertTriangleIcon className="h-4 w-4" />
              <AlertTitle>Write error</AlertTitle>
              <AlertDescription>{formError}</AlertDescription>
            </Alert>
          ) : null}

          {submittedHash ? (
            <Alert className="mt-3">
              <CheckCircle2Icon className="h-4 w-4" />
              <AlertTitle>Transaction</AlertTitle>
              <AlertDescription>
                <p className="break-all">Hash: {submittedHash}</p>
                <p>Status: {receipt.isSuccess ? 'Confirmed' : receipt.isError ? 'Failed' : 'Pending'}</p>
              </AlertDescription>
            </Alert>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
