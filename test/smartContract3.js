const SmartContract3 = artifacts.require("SmartContract3");

contract("SmartContract3", () => {
  it("should insert num in arr", async () => {
    const smartContract3 = await SmartContract3.deployed();
    await smartContract3.insert(10);
    const element = await smartContract3.arr(0);
    assert(element.toNumber() == 10);
  });

  it("should return length of arr", async () => {
    const smartContract3 = await SmartContract3.deployed();
    await smartContract3.insert(20);
    const length = await smartContract3.length();
    assert(length.toNumber() == 2);
  });
});
