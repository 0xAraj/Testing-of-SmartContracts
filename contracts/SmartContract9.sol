// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract SmartContract9 {
    enum State {
        PENDING,
        ACTIVE,
        CLOSED
    }
    State public state = State.PENDING;
    uint256 public amount;
    uint256 public interest;
    uint256 public end;
    uint256 public duration;
    address payable public borrower;
    address payable public lender;

    constructor(
        uint256 _amount,
        uint256 _interest,
        uint256 _duration,
        address payable _borrower,
        address payable _lender
    ) {
        amount = _amount;
        interest = _interest;
        duration = _duration;
        borrower = _borrower;
        lender = _lender;
    }

    function lend() public payable {
        require(msg.sender == lender, "Only lender can lend");
        require(msg.value == amount, "Please lend the exact amount");
        changeState(State.ACTIVE);
        borrower.transfer(amount);
    }

    function payBack() public payable {
        require(msg.sender == borrower, "Only borrower can pay back");
        require(
            msg.value == amount + interest,
            "Please return the exact amount"
        );
        changeState(State.CLOSED);
        lender.transfer(amount + interest);
    }

    function changeState(State to) internal {
        require(to != State.PENDING, "state is already a pending state");
        require(to != state, "Transition state can not be same");

        if (to == State.ACTIVE) {
            require(state == State.PENDING, "state is not pending");
            state = State.ACTIVE;
            end = block.timestamp + duration;
        }
        if (to == State.CLOSED) {
            require(state == State.ACTIVE, "state is not active");
            require(block.timestamp >= end, "Date has not matured yet");
            state = State.CLOSED;
        }
    }
}
