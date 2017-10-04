pragma solidity ^0.4.0;


contract Adoption {
    // We have only 16 places in total for adoptation.
    address[16] public adopters;


    // Adopting a pet
    function adopt(uint petId) public returns (uint) {
        require(petId >= 0 && petId <= 15);

        adopters[petId] = msg.sender;

        return petId;
    }

    // Retrieving the adopters
    function getAdopters() public returns (address[16]) {
        return adopters;
    }
}