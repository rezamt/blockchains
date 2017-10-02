var SimpleStorage = artifacts.require("SimpleStorage");

contract('SimpleStorage', function (accounts) {

    var contract; // DRY - One Instance but will be initialized during the execution

    var init = 10;

    beforeEach(function () {
        return SimpleStorage.new(init)
            .then(function (instance) {
                contract = instance;
            });
    });

    it("C: Validating init value is correctly passed", function () {
        return contract.get.call()
            .then(function (value) {
                assert.equal(value.valueOf(), init, "Initialization is successfull");
            });
    });

    it("TX: Setting value 65 and expecting storage returns 65", function () {
        return contract.set(65, {from : accounts[0]})
            .then(function (tx) {
                return contract.get.call();
            }).then(function (value) {
                assert.equal(value.valueOf(), 65, "Initialization is successfull");
            });
    });

});