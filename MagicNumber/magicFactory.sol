// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract makeByte {
    function deployd() external returns (uint256) {
        bytes memory byteCode = '\x60\x80\x60\x0c\x60\x00\x39\x60\x0a\x60\x00\xf3\x60\x2a\x60\x40\x52\x60\x20\x60\x40\xf3';
        /* 
            PUSH1 0x80
            PUSH1 0x0c
            PUSH1 0x00
            CODECOPY
            PUSH1 0x0a
            PUSH1 0x00
            RETURN
            PUSH1 0x2a
            PUSH1 0x40
            MSTORE
            PUSH1 0x20
            PUSH1 0x40
            RETURN
        */
        address deployAddr;
        uint256 size;
        assembly {
            deployAddr := create(0, add(byteCode, 0x20), mload(byteCode))
            size := extcodesize(deployAddr)
        }

        console.log(deployAddr);
        console.log(size);
        
        return size;
    }
}
