const SmartContract4 = artifacts.require("SmartContract4");

contract("SmartContract4", () => {
  let smartContract4 = null;
  before(async () => {
    smartContract4 = await SmartContract4.deployed();
  });

  it("should insert num in arr", async () => {
    await smartContract4.insert(10);
    const element = await smartContract4.arr(0);
    assert(element.toNumber() == 10);
  });

  it("should return length of arr", async () => {
    await smartContract4.insert(20);
    const length = await smartContract4.length();
    assert(length.toNumber() == 2);
  });

  it("should return whole array", async () => {
    await smartContract4.insert(30);
    const array = await smartContract4.getAll();
    const element = await array.map((e) => e.toNumber());
    assert.deepEqual(element, [10, 20, 30]);
  });
});
