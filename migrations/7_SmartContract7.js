const SmartContract7 = artifacts.require("SmartContract7");

module.exports = function (deployer, networks, accounts) {
  deployer.deploy(SmartContract7, accounts[0]);
};
