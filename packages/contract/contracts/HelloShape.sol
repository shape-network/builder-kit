// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title HelloShape
/// @notice Minimal baseline contract for deploy + read/write iteration loops.
contract HelloShape {
  error NotOwner();

  address public immutable owner;
  string private _message;

  event MessageUpdated(string oldMessage, string newMessage, address indexed updater);

  constructor(string memory initialMessage) {
    owner = msg.sender;
    _message = initialMessage;
  }

  function message() external view returns (string memory) {
    return _message;
  }

  function setMessage(string calldata newMessage) external {
    if (msg.sender != owner) revert NotOwner();

    string memory oldMessage = _message;
    _message = newMessage;

    emit MessageUpdated(oldMessage, newMessage, msg.sender);
  }
}
