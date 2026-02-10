import { alchemy } from '@/lib/clients';
import { useQuery } from '@tanstack/react-query';
import { OwnedNftsResponse } from 'alchemy-sdk';
import { Address } from 'viem';

/**
 * Example hook to fetch NFTs for a user
 * @param address - User's address to fetch NFTs for
 * @returns react-query's respons object containing OwnedNftsResponse data, pending states, errors, etc
 */
export function useGetNftForUser(address: Address) {
  return useQuery<OwnedNftsResponse>({
    queryKey: ['nft', address],
    queryFn: async () => {
      const nft = await alchemy.nft.getNftsForOwner(address, {
        contractAddresses: ['example-contract-address'],
      });
      return nft;
    },
    enabled: !!address,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
  });
}
