## Step 1 - Check the chain code to be compile 

``` bash
go build ./

# You should see a new binarry file called: chaincode
```

The following commands (using postman) can be run against the chaincode: 

``` bash
{
  "jsonrpc": "2.0",
  "method": "deploy",
  "params": {
    "type": 1,
    "chaincodeID": {
      "path": "https://github.com/rezamt/todo-list-fabric/chaincode"
    },
    "ctorMsg": {
      "function": "init",
      "args": [
        "init"
      ]
    },
    "secureContext": "user_type1_0"
  },
  "id": ccd17f28-4dbf-11e7-b114-b2f933d5fe66
}

{
  "jsonrpc": "2.0",
  "method": "invoke",
  "params": {
    "type": 1,
    "chaincodeID": {
      "name": "ae85a2bd7da4eaa2cf99ccabeac6099cab202c7cfd90824df2c96a0c629a2dd56814b3c74a4c1207b61007779725e0cfc7f362f8d1138bd45796197c3308d68a"
    },
    "ctorMsg": {
      "function": "account_add",
      "args": [
      	"ccd17f28-4dbf-11e7-b114-b2f933d5fe66", 
      	"reza", 
      	"mt",
        "reza",
        "pass1234"
      ]
    },
    "secureContext": "user_type1_0"
  },
  "id": 0
}

{
  "jsonrpc": "2.0",
  "method": "query",
  "params": {
    "type": 1,
    "chaincodeID": {
      "name": "ae85a2bd7da4eaa2cf99ccabeac6099cab202c7cfd90824df2c96a0c629a2dd56814b3c74a4c1207b61007779725e0cfc7f362f8d1138bd45796197c3308d68a"
    },
    "ctorMsg": {
      "function": "account_browser",
      "args": [
        "all"
      ]
    },
    "secureContext": "user_type1_0"
  },
  "id": ccd17f28-4dbf-11e7-b114-b2f933d5fe77
}

{
  "jsonrpc": "2.0",
  "method": "query",
  "params": {
    "type": 1,
    "chaincodeID": {
      "name": "ae85a2bd7da4eaa2cf99ccabeac6099cab202c7cfd90824df2c96a0c629a2dd56814b3c74a4c1207b61007779725e0cfc7f362f8d1138bd45796197c3308d68a"
    },
    "ctorMsg": {
      "function": "account_read",
      "args": [
        "reza",
        "pass1234"
      ]
    },
    "secureContext": "user_type1_0"
  },
  "id": ccd17f28-4dbf-11e7-b114-b2f933d5fe88
}
```
