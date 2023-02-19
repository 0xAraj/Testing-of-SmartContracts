// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract SmartContract3{

    uint256[] public arr;

    function insert(uint256 num) public{
        arr.push(num);
    }
    function length() public view returns(uint256){
        return arr.length;
    }
}