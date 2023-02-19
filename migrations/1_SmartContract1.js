const SmartContract1 = artifacts.require("SmartContract1");

module.exports = function (deployer) {
  deployer.deploy(SmartContract1);
};
