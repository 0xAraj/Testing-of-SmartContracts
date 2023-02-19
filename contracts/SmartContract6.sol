// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract SmartContract6{

    address payable public owner;

    constructor(address payable _owner){
        owner = _owner;
    }
    function deposite() public payable {

    }
    function balance() public view returns(uint256){
        return address(this).balance;
    }
}