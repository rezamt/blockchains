## Setting up Multi Node Private Ehtereum Blockchain
```
mkdir blockchain-training
```
# init genesis block
cd blockchain-training
geth --datadir=./firstnode --port 30303 init genesis.json
geth --datadir=./secondnode --port 30304 init genesis.json

# start the nodes
geth --datadir=./firstnode --port 30303  --networkid 1234   # 0 (main network),1 are reserved
geth --datadir=./secondnode --port 30304  --networkid 1234   # 0 (main network),1 are reserved

# Attaching to nodes console
geth attach ipc:/Users/reza/blockchain-training/firstnode/geth.ipc
geth attach ipc:/Users/reza/blockchain-training/secondnode/geth.ipc


# Run the following commands in each console and observer the result
# for the following modules: admin:1.0 debug:1.0 eth:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

admin
admin.nodeInfo
admin.peers


# Adding node #2 to the peer list on node #1
## 1- get the node #2 enode string using 
admin.nodeInfo.enode

Result should be: 
   "enode://5b50b6b68d24ef9f228f37fd5590e9dd1c08cf74bed8c01702787d1cec3df24753b9839d317565df556cbe9957e74563262cde5928275ef0762bbb6a876a2ffd@[::]:30304"


## 2- now on node #1 run the following command using enode id from previous step
admin.addPeer("enode://5b50b6b68d24ef9f228f37fd5590e9dd1c08cf74bed8c01702787d1cec3df24753b9839d317565df556cbe9957e74563262cde5928275ef0762bbb6a876a2ffd@[::]:30304") 

## 3- check the peers status on both node #1 and node #2
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
