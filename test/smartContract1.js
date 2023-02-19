const SmartContract1 = artifacts.require("SmartContract1");

contract("SmartContract1", () => {
  it("should return a string", async () => {
    const smartContract1 = await SmartContract1.deployed();
    const result = await smartContract1.print();
    assert(result == "This is my first testing");
  });
});
