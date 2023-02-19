const SmartContract2 = artifacts.require("SmartContract2");

contract("SmartContract2", () => {
  it("should set the value of message", async () => {
    const smartContract2 = await SmartContract2.deployed();
    await smartContract2.set("Aditya");
    const result = await smartContract2.get(); // here isntead of get() you can also use message()
    assert(result == "Aditya");
  });
});
