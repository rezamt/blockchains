var EToken = artifacts.require("EToken");

contract('EToken', function (accounts) {

    var contract; // DRY - One Instance but will be initialized during the execution

    beforeEach(function () {
        return EToken.new()
            .then(function (instance) {
                contract = instance;
            });
    });

    it("C: should put 100000 ETOKEN total supply", function () {
        return contract.totalSupply.call(accounts[0])
            .then(function (totalSupply) {
                assert.equal(totalSupply.valueOf(), 100000, "100000 wasn't in the first account");
            });
    });

    it("C: balance of owner should be 100000", function () {
        return contract.balanceOf.call(accounts[0])
            .then(function (balance) {
                assert.equal(balance.valueOf(), 100000, "100000 wasn't in the first account");
            });
    });

    it("C: balance of any new account should be 0", function () {
        return contract.balanceOf.call(accounts[1])
            .then(function (balance) {
                assert.equal(balance.valueOf(), 0, "0 wasn't in the first account");
            });
    });


    it("TX: should send ETOKEN correctly", function () {


        // Get initial balances of first and second account.
        var account_one = accounts[0];
        var account_two = accounts[1];

        var account_one_starting_balance;
        var account_two_starting_balance;
        var account_one_ending_balance;
        var account_two_ending_balance;

        var amount = 10;

        return contract.balanceOf.call(account_one)
            .then(function (balance) {
                account_one_starting_balance = balance.toNumber();
                return contract.balanceOf.call(account_two);
            }).then(function (balance) {
                account_two_starting_balance = balance.toNumber();

                // This is a transactional method
                return contract.transfer(account_two, amount, {from: account_one});
            }).then(function () {
                return contract.balanceOf.call(account_one);
            }).then(function (balance) {
                account_one_ending_balance = balance.toNumber();
                return contract.balanceOf.call(account_two);
            }).then(function (balance) {
                account_two_ending_balance = balance.toNumber();

                assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
                assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
            });
    });

    it("TX: should be able to lend money and that user spend it", function () {
            return contract.approve(accounts[1], 5555, {from: accounts[0]})
            .then(function (tx) {
                assert.lengthOf(tx.logs, 1, 'Transaction Event is missing');
                assert.equal(tx.logs[0].event, "Approval", "Approval Event should be emitted");
                return contract.allowance.call(accounts[0], accounts[1]);
            })
            .then(function (allowance) {
                assert.equal(allowance, 5555, "allowance should be increased");
                return contract.transferFrom(accounts[0], accounts[2], 55555, {from: accounts[1]});
            })
            .then(function (failedTransaction) {
                return contract.balanceOf.call(accounts[2]);
            })
            .then(function (balance) {
                assert.equal(balance.valueOf(), 0, "transfer should not go through");
                return contract.transferFrom(accounts[0], accounts[2], 100, {from: accounts[1]});
            })
            .then(function (transactionCompleted) {
                return contract.balanceOf.call(accounts[2])
            })
            .then(function (balance) {
                assert.equal(balance.valueOf(), 100, "the balance should be transferred")
            });
    });
});