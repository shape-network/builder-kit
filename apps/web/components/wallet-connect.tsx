'use client';

import { Button } from '@/components/ui/button';
import { abbreviateHash } from '@/lib/utils';
import { useSyncExternalStore } from 'react';
import { mainnet } from 'viem/chains';
import { useAccount, useConnect, useConnectors, useDisconnect, useEnsName, useSwitchChain } from 'wagmi';

export const WalletConnect = () => {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const { address, chain, isConnected } = useAccount();
  const connectors = useConnectors();
  const { connect, error: connectError, status: connectStatus } = useConnect();
  const { disconnect } = useDisconnect();
  const { chains, switchChain } = useSwitchChain();
  const { data: ensName } = useEnsName({ address, chainId: mainnet.id, query: { enabled: !!address } });
  const connectErrorLabel = connectError?.message.split('Details:')[0]?.trim();
  const preferredConnector =
    connectors.find((connector) => connector.id === 'walletConnect' || connector.name === 'WalletConnect') ??
    connectors[0];
  const isConnecting = connectStatus === 'pending';

  function handleDisconnect() {
    disconnect();
  }

  if (!mounted) {
    return (
      <Button size="sm" variant="outline" disabled>
        Connect
      </Button>
    );
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          {chains.map((supportedChain) => (
            <Button
              key={supportedChain.id}
              size="sm"
              variant={chain?.id === supportedChain.id ? 'default' : 'outline'}
              onClick={() => switchChain({ chainId: supportedChain.id })}
            >
              {supportedChain.name}
            </Button>
          ))}
        </div>
        <span className="text-sm font-medium">{ensName ?? abbreviateHash(address)}</span>
        <Button size="sm" variant="outline" onClick={handleDisconnect}>
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        variant="outline"
        disabled={isConnecting || !preferredConnector}
        onClick={() => preferredConnector && connect({ connector: preferredConnector })}
      >
        {isConnecting ? 'Connecting...' : 'Connect'}
      </Button>
      {!preferredConnector ? (
        <span className="text-muted-foreground text-sm">No wallet connector configured</span>
      ) : null}
      {connectError ? (
        <span className="text-destructive hidden text-xs md:inline">
          {connectErrorLabel || 'Connection failed'}
        </span>
      ) : null}
    </div>
  );
};
