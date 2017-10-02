## How to use truffle development console ?

# truffle console

```
# tuffle console

truffle development > var meta;

truffle development > var accounts = web3.eth.getAccounts(function(e,a) { accounts=a; });
or
truffle development > var accounts = web3.eth.accounts;

truffle development > MetaCoin.deployed().then(function(instance) { meta = instance; });

truffle development > meta
truffle development > meta.abi

truffle development > var account = accounts[0]; // Getting balance of the first account (owner)
truffle development > meta.getBalance.call(account).then(function(_balance) { balance = _balance; });

truffle development > balance.valueOf() // account 0 (owner balance)

// 2x CTL+C to exit

```


