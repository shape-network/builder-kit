import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// HelloShape
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**

*/
export const helloShapeAbi = [
  {
    type: 'constructor',
    inputs: [{ name: 'initialMessage', internalType: 'string', type: 'string' }],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'EmptyMessage' },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'oldMessage', internalType: 'string', type: 'string', indexed: false },
      { name: 'newMessage', internalType: 'string', type: 'string', indexed: false },
      { name: 'updater', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'MessageUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'previousOwner', internalType: 'address', type: 'address', indexed: true },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferStarted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'previousOwner', internalType: 'address', type: 'address', indexed: true },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'function',
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'message',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pendingOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newMessage', internalType: 'string', type: 'string' }],
    name: 'setMessage',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;

/**

*/
export const helloShapeAddress = {} as const;

/**

*/
export const helloShapeConfig = { address: helloShapeAddress, abi: helloShapeAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link helloShapeAbi}__
 */
export const useReadHelloShape = /*#__PURE__*/ createUseReadContract({
  abi: helloShapeAbi,
  address: helloShapeAddress,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link helloShapeAbi}__ and `functionName` set to `"message"`
 */
export const useReadHelloShapeMessage = /*#__PURE__*/ createUseReadContract({
  abi: helloShapeAbi,
  address: helloShapeAddress,
  functionName: 'message',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link helloShapeAbi}__ and `functionName` set to `"owner"`
 */
export const useReadHelloShapeOwner = /*#__PURE__*/ createUseReadContract({
  abi: helloShapeAbi,
  address: helloShapeAddress,
  functionName: 'owner',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link helloShapeAbi}__ and `functionName` set to `"pendingOwner"`
 */
export const useReadHelloShapePendingOwner = /*#__PURE__*/ createUseReadContract({
  abi: helloShapeAbi,
  address: helloShapeAddress,
  functionName: 'pendingOwner',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link helloShapeAbi}__
 */
export const useWriteHelloShape = /*#__PURE__*/ createUseWriteContract({
  abi: helloShapeAbi,
  address: helloShapeAddress,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link helloShapeAbi}__ and `functionName` set to `"acceptOwnership"`
 */
export const useWriteHelloShapeAcceptOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: helloShapeAbi,
  address: helloShapeAddress,
  functionName: 'acceptOwnership',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link helloShapeAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteHelloShapeRenounceOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: helloShapeAbi,
  address: helloShapeAddress,
  functionName: 'renounceOwnership',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link helloShapeAbi}__ and `functionName` set to `"setMessage"`
 */
export const useWriteHelloShapeSetMessage = /*#__PURE__*/ createUseWriteContract({
  abi: helloShapeAbi,
  address: helloShapeAddress,
  functionName: 'setMessage',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link helloShapeAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteHelloShapeTransferOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: helloShapeAbi,
  address: helloShapeAddress,
  functionName: 'transferOwnership',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link helloShapeAbi}__
 */
export const useSimulateHelloShape = /*#__PURE__*/ createUseSimulateContract({
  abi: helloShapeAbi,
  address: helloShapeAddress,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link helloShapeAbi}__ and `functionName` set to `"acceptOwnership"`
 */
export const useSimulateHelloShapeAcceptOwnership = /*#__PURE__*/ createUseSimulateContract({
  abi: helloShapeAbi,
  address: helloShapeAddress,
  functionName: 'acceptOwnership',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link helloShapeAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateHelloShapeRenounceOwnership = /*#__PURE__*/ createUseSimulateContract({
  abi: helloShapeAbi,
  address: helloShapeAddress,
  functionName: 'renounceOwnership',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link helloShapeAbi}__ and `functionName` set to `"setMessage"`
 */
export const useSimulateHelloShapeSetMessage = /*#__PURE__*/ createUseSimulateContract({
  abi: helloShapeAbi,
  address: helloShapeAddress,
  functionName: 'setMessage',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link helloShapeAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateHelloShapeTransferOwnership = /*#__PURE__*/ createUseSimulateContract({
  abi: helloShapeAbi,
  address: helloShapeAddress,
  functionName: 'transferOwnership',
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link helloShapeAbi}__
 */
export const useWatchHelloShapeEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: helloShapeAbi,
  address: helloShapeAddress,
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link helloShapeAbi}__ and `eventName` set to `"MessageUpdated"`
 */
export const useWatchHelloShapeMessageUpdatedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: helloShapeAbi,
  address: helloShapeAddress,
  eventName: 'MessageUpdated',
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link helloShapeAbi}__ and `eventName` set to `"OwnershipTransferStarted"`
 */
export const useWatchHelloShapeOwnershipTransferStartedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: helloShapeAbi,
    address: helloShapeAddress,
    eventName: 'OwnershipTransferStarted',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link helloShapeAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchHelloShapeOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: helloShapeAbi,
    address: helloShapeAddress,
    eventName: 'OwnershipTransferred',
  });
