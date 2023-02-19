const SmartContract8 = artifacts.require("SmartContract8");

module.exports = function (deployer, networks, accounts) {
  deployer.deploy(SmartContract8, accounts[0]);
};
