const SmartContract6 = artifacts.require("SmartContract6");

module.exports = function (deployer, networks, accounts) {
  deployer.deploy(SmartContract6, accounts[0]);
};
