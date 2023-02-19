// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract SmartContract5{

    function check(uint256 a, uint256 b) public pure returns(uint256){
        require(a>b,'a should be greater than b');
        uint256 c;
        c=a;
        return c;
    }
}