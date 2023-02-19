const SmartContract6 = artifacts.require("SmartContract6");

contract("SmartContract6", (accounts) => {
  let smartContract6 = null;
  before(async () => {
    smartContract6 = await SmartContract6.deployed();
  });

  it("should set owner", async () => {
    const owner = await smartContract6.owner();
    assert(owner == accounts[0]);
  });

  it("should deposite ether to contract account", async () => {
    await smartContract6.deposite({ from: accounts[1], value: 40 });
    const balance = await web3.eth.getBalance(smartContract6.address);
    assert(parseInt(balance) == 40);
  });

  it("should return CA balance", async () => {
    await smartContract6.deposite({ from: accounts[2], value: 20 });
    const balance = await smartContract6.balance();
    assert(balance.toNumber() == 60); //40 from a[1] + 20 from a[2]
  });
});
