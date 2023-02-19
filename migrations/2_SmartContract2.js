const SmartContract2 = artifacts.require("SmartContract2");

module.exports = function (deployer) {
  deployer.deploy(SmartContract2);
};
