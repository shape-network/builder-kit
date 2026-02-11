import { alchemy } from '@/lib/clients';
import { useQuery } from '@tanstack/react-query';
import { OwnedNftsResponse } from 'alchemy-sdk';
import { Address, isAddress } from 'viem';

/**
 * TEMPLATE CUSTOMIZATION POINT:
 * Replace with real NFT collection contract addresses to scope results.
 * Keep placeholder values to fetch all NFTs for the wallet.
 */
const TEMPLATE_CONTRACT_ADDRESSES = ['example-contract-address'];

/**
 * Example hook to fetch NFTs for a user
 * @param address - User's address to fetch NFTs for
 * @returns react-query's respons object containing OwnedNftsResponse data, pending states, errors, etc
 */
export function useGetNftForUser(address: Address) {
  return useQuery<OwnedNftsResponse>({
    queryKey: ['nft', address],
    queryFn: async () => {
      const contractAddresses = TEMPLATE_CONTRACT_ADDRESSES.filter((contractAddress) =>
        isAddress(contractAddress),
      );
      const nft = await alchemy.nft.getNftsForOwner(address, {
        contractAddresses: contractAddresses.length > 0 ? contractAddresses : undefined,
      });
      return nft;
    },
    enabled: !!address,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
  });
}
