const SmartContract7 = artifacts.require("SmartContract7");

contract("SmartContract7", (accounts) => {
  let smartContract7 = null;
  before(async () => {
    smartContract7 = await SmartContract7.deployed();
  });

  it("should set owner", async () => {
    const owner = await smartContract7.owner();
    assert(owner == accounts[0]);
  });

  it("should deposite ether to contract account", async () => {
    await smartContract7.deposite({ from: accounts[1], value: 40 });
    const balance = await web3.eth.getBalance(smartContract7.address);
    assert(parseInt(balance) == 40);
  });

  it("should return CA balance", async () => {
    await smartContract7.deposite({ from: accounts[2], value: 20 });
    const balance = await smartContract7.balance();
    assert(balance.toNumber() == 60); //40 from a[1] + 20 from a[2]
  });

  it("should transfer ether from CA", async () => {
    const initialBalance = await web3.eth.getBalance(accounts[3]);
    const initialBalanceObject = web3.utils.toBN(initialBalance);
    await smartContract7.send(accounts[3], 20, { from: accounts[0] });
    const finalBalance = await web3.eth.getBalance(accounts[3]);
    const finalBalanceObject = web3.utils.toBN(finalBalance);
    const balance = finalBalanceObject.sub(initialBalanceObject).toNumber();
    assert(balance == 20);
  });

  it("only owner should transfer the funds", async () => {
    try {
      await smartContract7.send(accounts[3], 20, { from: accounts[0] });
    } catch (error) {
      assert(false, "you are not owner");
    }
  });
});
