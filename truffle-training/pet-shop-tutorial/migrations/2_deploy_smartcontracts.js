var Adoption = artifacts.require("./Adoption.sol");

module.exports = function(deployer, network, accoutns) {
    deployer.deploy(Adoption);
};
