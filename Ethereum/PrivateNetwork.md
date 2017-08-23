## Setting up Multi Node Private Ehtereum Blockchain

Before you start make sure that you have installed geth client for this project.

```
mkdir blockchain-training
```
# Init the genesis block

You can find a genesis block [here](https://github.com/ethereum/go-ethereum/wiki/Private-network)

or use the sample I am putting here, and save it in your current directory as genesis.json

```
{
  "coinbase"   : "0x0000000000000000000000000000000000000001",
  "difficulty" : "0x20000",
  "extraData"  : "",
  "gasLimit"   : "0x2fefd8",
  "nonce"      : "0x0000000000000042",
  "mixhash"    : "0x0000000000000000000000000000000000000000000000000000000000000000",
  "parentHash" : "0x0000000000000000000000000000000000000000000000000000000000000000",
  "timestamp"  : "0x00",
  "alloc": {},
  "config": {
        "chainId": 15,
        "homesteadBlock": 0,
        "eip155Block": 0,
        "eip158Block": 0
    }
}

# - alloc  : If you need some base account with inital deposit in them.
  "alloc": {
     "7df9a875a174b3bc565e6424a0050ebc1b2d1d82": { "balance": "300000" },
     "f41c74c9ae680c1aa78f42e5647a62f353b7bdde": { "balance": "400000" }
 }
    
# - config : Make sure you are setting up correct chainId

```

then run the following commands:

```
cd blockchain-training
geth --datadir=./firstnode --port 30303 init genesis.json
geth --datadir=./secondnode --port 30304 init genesis.json
```

# start the nodes
```
geth --datadir=./firstnode --port 30303  --networkid 1234   # 0 (main network),1 are reserved
geth --datadir=./secondnode --port 30304  --networkid 1234   # 0 (main network),1 are reserved
```
# Attaching to nodes console
```
geth attach ipc:/Users/reza/blockchain-training/firstnode/geth.ipc
geth attach ipc:/Users/reza/blockchain-training/secondnode/geth.ipc

# Run the following commands in each console and observer the result
# for the following modules: admin:1.0 debug:1.0 eth:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

web3              # all objects are listed under this object
txpool            # Check the current transaction pool
admin             # Admin object and all related admin tasks
admin.nodeInfo    
admin.peers
```
# Adding node #2 to the peer list on node #1
1- get the node #2 enode string using 
```
admin.nodeInfo.enode

"enode://5b50b6b68d24ef9f228f37fd5590e9dd1c08cf74bed8c01702787d1cec3df24753b9839d317565df556cbe9957e74563262cde5928275ef0762bbb6a876a2ffd@[::]:30304"
```

2- now on node #1 run the following command using enode id from previous step

```
admin.addPeer("enode://5b50b6b68d24ef9f228f37fd5590e9dd1c08cf74bed8c01702787d1cec3df24753b9839d317565df556cbe9957e74563262cde5928275ef0762bbb6a876a2ffd@[::]:30304") 
```

3- check the peers status on both node #1 and node #2

```
admin.peers

[{
    caps: ["eth/63"],
    id: "5b50b6b68d24ef9f228f37fd5590e9dd1c08cf74bed8c01702787d1cec3df24753b9839d317565df556cbe9957e74563262cde5928275ef0762bbb6a876a2ffd",
    name: "Geth/v1.6.7-stable-ab5646c5/darwin-amd64/go1.8.3",
    network: {
      localAddress: "[::1]:59623",
      remoteAddress: "[::1]:30304"
    },
    protocols: {
      eth: {
        difficulty: 131072,
        head: "0x2fb1a756bef56a207e8cdf53868212b667a3d32fa33d93f3305092129af0181a",
        version: 63
      }
    }
}]

```
## Mining on your Private Network

on either node #1 or node #2 run the following command:

```
eth.accounts   # No accounts at the begining will be displayed. :D

[]

personal.listAccounts # No accounts at the begining will be displayed. :D

[]


personal.newAccount()
Passphrase:
Repeat passphrase:
"0xd273aa774c412a167f0079fa2cabc07e9167f1d5"

eth.accounts
["0xd273aa774c412a167f0079fa2cabc07e9167f1d5"]

personal.listAccounts
["0xd273aa774c412a167f0079fa2cabc07e9167f1d5"]
```
Repeat the above account on any node that you would like to do mining.


Now lets check the mining object:

```
miner

{
  getHashrate: function(),
  setEtherbase: function(),
  setExtra: function(),
  setGasPrice: function(),
  start: function(),
  stop: function()
}

miner.start(1)     The input parameter is the number of threads.

```
Now you should see the following ouput on either node #1 or #2

```
INFO [08-24|00:42:46] Block synchronisation started
INFO [08-24|00:42:46] Imported new state entries               count=1 flushed=1 elapsed=60.135µs processed=1 pending=0 retry=0 duplicate=0 unexpected=0
INFO [08-24|00:42:46] Imported new block headers               count=2 elapsed=3.754ms  number=2 hash=0c9167…e06033 ignored=0
INFO [08-24|00:42:46] Imported new chain segment               blocks=2 txs=0 mgas=0.000 elapsed=426.024µs mgasps=0.000 number=2 hash=0c9167…e06033
INFO [08-24|00:42:46] Fast sync complete, auto disabling
INFO [08-24|00:42:51] Imported new chain segment               blocks=1 txs=0 mgas=0.000 elapsed=3.319ms   mgasps=0.000 number=3 hash=daa129…4ef468
INFO [08-24|00:42:52] Imported new chain segment               blocks=1 txs=0 mgas=0.000 elapsed=3.444ms   mgasps=0.000 number=4 hash=d3d8d0…8f6f3a
INFO [08-24|00:42:53] Imported new chain segment               blocks=1 txs=0 mgas=0.000 elapsed=2.882ms   mgasps=0.000 number=5 hash=b8da43…b12b45
INFO [08-24|00:42:53] Imported new chain segment               blocks=1 txs=0 mgas=0.000 elapsed=3.354ms   mgasps=0.000 number=6 hash=0af221…402689
INFO [08-24|00:42:57] Imported new chain segment               blocks=1 txs=0 mgas=0.000 elapsed=2.822ms   mgasps=0.000 number=7 hash=1bf78c…b1b0d1
INFO [08-24|00:42:59] Imported new chain segment               blocks=1 txs=0 mgas=0.000 elapsed=2.593ms   mgasps=0.000 number=8 hash=397cf1…7b76fb

```


### Additional Links and References
- [Private-network](https://github.com/ethereum/go-ethereum/wiki/Private-network)
- [Mining](https://github.com/ethereum/go-ethereum/wiki/Mining)
- [Cli Tools - GETH & ETH](https://www.ethereum.org/cli)
