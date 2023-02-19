// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract SmartContract2{
    string public message;

    function set(string memory _message) public{
        message = _message;
    }
    function get() public view returns(string memory){
        return message;
    }
}