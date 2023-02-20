const { expectRevert, time } = require("@openzeppelin/test-helpers");
const SmartContract9 = artifacts.require("SmartContract9");

contract("SmartContract9", (accounts) => {
  const amount = 1000;
  const interest = 10;
  const duration = 100;
  const lender = accounts[2];
  const borrower = accounts[1];
  let smartContract9 = null;
  before(async () => {
    smartContract9 = await SmartContract9.deployed();
  });

  it("should not allow if caller is not lender", async () => {
    await expectRevert(
      smartContract9.lend({ from: borrower, value: amount }),
      "Only lender can lend"
    );
  });

  it("should not allowed if amount is not same", async () => {
    await expectRevert(
      smartContract9.lend({ from: lender, value: 20 }),
      "Please lend the exact amount"
    );
  });

  it("should lend money", async () => {
    const initialBalance = web3.utils.toBN(await web3.eth.getBalance(borrower));
    await smartContract9.lend({ from: lender, value: amount });
    const finalBalance = web3.utils.toBN(await web3.eth.getBalance(borrower));
    const state = await smartContract9.state();
    assert(state.toNumber() == 1);
    assert(finalBalance.sub(initialBalance).toNumber() == amount);
  });

  it("should not allow if caller is not borrower", async () => {
    await expectRevert(
      smartContract9.payBack({ from: lender, value: amount + interest }),
      "Only borrower can pay back"
    );
  });

  it("should not allow if return amount is not exact", async () => {
    await expectRevert(
      smartContract9.payBack({ from: borrower, value: amount }),
      "Please return the exact amount"
    );
  });

  it("should not call if loan has not matured", async () => {
    await expectRevert(
      smartContract9.payBack({ from: borrower, value: amount + interest }),
      "Date has not matured yet"
    );
  });

  it("should pay back the amount", async () => {
    time.increase(duration + 10);
    const initialBalance = web3.utils.toBN(await web3.eth.getBalance(lender));
    await smartContract9.payBack({ from: borrower, value: amount + interest });
    const finalBalance = web3.utils.toBN(await web3.eth.getBalance(lender));
    const state = await smartContract9.state();
    assert(state.toNumber() == 2);
    assert(finalBalance.sub(initialBalance).toNumber() == amount + interest);
  });
});
