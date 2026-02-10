require('@nomicfoundation/hardhat-toolbox');
require('dotenv/config');

const SHAPE_SEPOLIA_RPC_URL =
  process.env.SHAPE_SEPOLIA_RPC_URL ?? 'https://sepolia.shape.network';
const SHAPE_MAINNET_RPC_URL = process.env.SHAPE_MAINNET_RPC_URL ?? 'https://mainnet.shape.network';

const SHAPE_SEPOLIA_EXPLORER_API_URL =
  process.env.SHAPE_SEPOLIA_EXPLORER_API_URL ?? 'https://explorer-sepolia.shape.network/api';
const SHAPE_MAINNET_EXPLORER_API_URL =
  process.env.SHAPE_MAINNET_EXPLORER_API_URL ?? 'https://explorer.shape.network/api';

const SHAPE_SEPOLIA_EXPLORER_URL =
  process.env.SHAPE_SEPOLIA_EXPLORER_URL ?? 'https://explorer-sepolia.shape.network';
const SHAPE_MAINNET_EXPLORER_URL =
  process.env.SHAPE_MAINNET_EXPLORER_URL ?? 'https://explorer.shape.network';

const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY;
const accounts = DEPLOYER_PRIVATE_KEY ? [DEPLOYER_PRIVATE_KEY] : [];

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: '0.8.24',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    shapeSepolia: {
      chainId: 11011,
      url: SHAPE_SEPOLIA_RPC_URL,
      accounts,
    },
    shapeMainnet: {
      chainId: 360,
      url: SHAPE_MAINNET_RPC_URL,
      accounts,
    },
  },
  etherscan: {
    apiKey: {
      shapeSepolia: process.env.SHAPE_EXPLORER_API_KEY ?? 'shape',
      shapeMainnet: process.env.SHAPE_EXPLORER_API_KEY ?? 'shape',
    },
    customChains: [
      {
        network: 'shapeSepolia',
        chainId: 11011,
        urls: {
          apiURL: SHAPE_SEPOLIA_EXPLORER_API_URL,
          browserURL: SHAPE_SEPOLIA_EXPLORER_URL,
        },
      },
      {
        network: 'shapeMainnet',
        chainId: 360,
        urls: {
          apiURL: SHAPE_MAINNET_EXPLORER_API_URL,
          browserURL: SHAPE_MAINNET_EXPLORER_URL,
        },
      },
    ],
  },
};
