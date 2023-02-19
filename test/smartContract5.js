const SmartContract5 = artifacts.require("SmartContract5");

contract("SmartContract5", () => {
  let smartContract5 = null;
  before(async () => {
    smartContract5 = await SmartContract5.deployed();
  });

  it("should check which is greater", async () => {
    try {
      let a = 5;
      let b = 4;
      const result = await smartContract5.check(a, b);
      assert(result.toNumber() == 5);
    } catch (error) {
      assert(false, "a is smaller than b");
    }
  });
});
