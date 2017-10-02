var EToken = artifacts.require("./EToken.sol");

module.exports = function(deployer, network, accounts) {
  // console.log('Network : ', network);
  // console.log('Accounts: ', accounts);
  deployer.deploy(EToken);
};
