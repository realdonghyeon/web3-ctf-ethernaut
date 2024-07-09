// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./Privacy.sol";

contract _unlock {
    Privacy public privacy;

    constructor (address _address) {
        privacy = Privacy(_address);
    }

    function Unlock(bytes32 _key) public {
        bytes16 key = bytes16(_key);
        privacy.unlock(key);
    }

}
