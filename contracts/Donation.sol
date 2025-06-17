// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.18;

contract Donation {
  address public owner;
  mapping (address => uint256) public donations;

  constructor() {
    owner = msg.sender;
  }

  function donate() public payable {
    require(msg.value > 0, "Must Send ETH");
    donations[msg.sender] += msg.value;
  }

  function getDonation(address donor) public view returns (uint256) {
    return donations[donor];
  }

  function withdraw() public {
    require(msg.sender == owner, "Not Owner");
    payable(owner).transfer(address(this).balance);
  }

  function getBalance() public view returns (uint256) {
    return address(this).balance;
  }
}