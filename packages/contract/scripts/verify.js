const hre = require('hardhat');

async function main() {
  const contractAddress = process.env.CONTRACT_ADDRESS;
  const initialMessage = process.env.INITIAL_MESSAGE ?? 'Hello Shape';

  if (!contractAddress) {
    throw new Error('Missing CONTRACT_ADDRESS. Example: CONTRACT_ADDRESS=0x... bun --filter=@builder-kit/contract run verify --network shapeSepolia');
  }

  try {
    await hre.run('verify:verify', {
      address: contractAddress,
      constructorArguments: [initialMessage],
    });

    console.log(`Verified HelloShape at: ${contractAddress}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (message.toLowerCase().includes('already verified')) {
      console.log(`Already verified: ${contractAddress}`);
      return;
    }

    throw error;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
