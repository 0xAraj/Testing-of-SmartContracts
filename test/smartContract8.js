const SmartContract8 = artifacts.require("SmartContract8");

contract("SmartContract8", (accounts) => {
  let smartContract8 = null;
  before(async () => {
    smartContract8 = await SmartContract8.deployed();
  });

  it("should set the owner", async () => {
    const owner = await smartContract8.owner();
    assert(owner == accounts[0]);
  });

  it("should transfer funds according to given data", async () => {
    let addresses = [accounts[1], accounts[2], accounts[3]];
    let amounts = [10, 20, 30];
    const initialBalance = await Promise.all(
      addresses.map((e) => web3.eth.getBalance(e))
    );
    await smartContract8.send(addresses, amounts, {
      from: accounts[0],
      value: 90,
    });

    const finalBalance = await Promise.all(
      addresses.map((e) => web3.eth.getBalance(e))
    );

    addresses.forEach((item, e) => {
      const beforeTransfer = web3.utils.toBN(initialBalance[e]);
      const afterTransfer = web3.utils.toBN(finalBalance[e]);

      const result = afterTransfer.sub(beforeTransfer).toNumber();
      assert(result == amounts[e]);
    });
  });

  //Below tests are for wrong inputs

  it("length of address and amount should not be same", async () => {
    let addresses = [accounts[1], accounts[2], accounts[3]];
    let amounts = [10, 20];
    try {
      await smartContract8.send(addresses, amounts, {
        from: accounts[0],
        value: 90,
      });
    } catch (error) {
      assert(error.message.includes("Both lenghts must be equal"));
      return;
    }
    assert(false);
  });

  it("when owner is wrong", async () => {
    let addresses = [accounts[1], accounts[2], accounts[3]];
    let amounts = [10, 20, 30];
    try {
      await smartContract8.send(addresses, amounts, {
        from: accounts[1],
        value: 90,
      });
    } catch (error) {
      assert(
        error.message.includes(
          "VM Exception while processing transaction: revert"
        )
      );
      return;
    }
    assert(false);
  });
});
