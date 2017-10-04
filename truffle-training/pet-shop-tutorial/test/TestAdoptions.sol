pragma solidity ^0.4.11;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Adoption.sol";

contract TestAdoptions {
    Adoption adoption = Adoption(DeployedAddresses.Adoption());

    // Testing the adopt() function
    function testUserCanAdoptPet() {
        uint returnedId = adoption.adopt(8);

        uint expected = 8;

        Assert.equal(returnedId, expected, "Adoption of pet ID 8 should be recorded.");
    }

    // Testing retrieval of a single pet's owner
    function testGetAdopterAddressByPetId() {
        address expected = this;

        address adopter = adoption.adopters(8);

        Assert.equal(adopter, expected, "Owner of pet ID 8 should be recorded.");
    }


    // Testing retrieval of all pet owners
    function testGetAdopterAddressByPetIdInArray() {
        address expected = this;

        /*
        Note the memory attribute on adopters. The memory attribute tells Solidity to temporarily store the value in memory,
        rather than saving it to the contract's storage. Since adopters is an array, and we know from the first adoption test
        that we adopted pet 8, we compare the testing contracts address with location 8 in the array.
        */

        address[16] memory adopters = adoption.getAdopters();

        Assert.equal(adopters[8], expected, "Owner of pet ID 8 should be recorded.");
    }

}