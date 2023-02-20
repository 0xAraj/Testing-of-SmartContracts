const SmartContract9 = artifacts.require("SmartContract9");

module.exports = function (deployer, networks, accounts) {
  deployer.deploy(SmartContract9, 1000, 10, 100, accounts[1], accounts[2]);
};
