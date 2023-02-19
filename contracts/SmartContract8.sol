// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract SmartContract8{

    address public owner;
    constructor(address _owner){
        owner = _owner;
    }

    function send(address payable[] memory to, uint256[] memory amount) public payable ownerOnly{
        require(to.length == amount.length,'Both lenghts must be equal');
 
        for(uint256 i = 0; i< to.length; i++){
           to[i].transfer(amount[i]);
        }
    }
    modifier ownerOnly(){
        require(msg.sender == owner);
        _;
    }
}