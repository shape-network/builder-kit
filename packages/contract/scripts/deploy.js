const hre = require('hardhat');

async function main() {
  const initialMessage = process.env.INITIAL_MESSAGE ?? 'Hello Shape';
  const isRemoteNetwork = hre.network.name !== 'hardhat';

  if (isRemoteNetwork && !process.env.DEPLOYER_PRIVATE_KEY) {
    throw new Error('Missing DEPLOYER_PRIVATE_KEY for remote deployment.');
  }

  const [deployer] = await hre.ethers.getSigners();

  console.log(`Network: ${hre.network.name}`);
  console.log(`Deployer: ${deployer.address}`);

  const helloShapeFactory = await hre.ethers.getContractFactory('HelloShape');
  const helloShape = await helloShapeFactory.deploy(initialMessage);

  await helloShape.waitForDeployment();

  const address = await helloShape.getAddress();

  console.log(`HelloShape deployed at: ${address}`);
  console.log(`Constructor args: [\"${initialMessage}\"]`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
