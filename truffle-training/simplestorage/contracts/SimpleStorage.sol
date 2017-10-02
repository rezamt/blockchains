pragma solidity ^0.4.8;

contract SimpleStorage {
  uint public storedData;

  function SimpleStorage(uint initVal) {
    storedData = initVal;
  }

  function set(uint x) {
    storedData = x;
  }

  function get() constant returns (uint retVal) {
    return storedData;
  }
}
