// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { Ownable } from '@openzeppelin/contracts/access/Ownable.sol';
import { Ownable2Step } from '@openzeppelin/contracts/access/Ownable2Step.sol';

/// @title HelloShape
/// @notice Minimal baseline contract for deploy + read/write iteration loops.
contract HelloShape is Ownable2Step {
  error EmptyMessage();

  string private _message;

  event MessageUpdated(string oldMessage, string newMessage, address indexed updater);

  constructor(string memory initialMessage) Ownable(msg.sender) {
    _revertIfEmpty(initialMessage);
    _message = initialMessage;
  }

  function message() external view returns (string memory) {
    return _message;
  }

  function setMessage(string calldata newMessage) external onlyOwner {
    _revertIfEmpty(newMessage);

    string memory oldMessage = _message;
    _message = newMessage;

    emit MessageUpdated(oldMessage, newMessage, msg.sender);
  }

  function _revertIfEmpty(string memory value) private pure {
    if (bytes(value).length == 0) revert EmptyMessage();
  }
}
