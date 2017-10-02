pragma solidity ^0.4.0;

/**
 * The ERC20 Token Standard Interface
 * Author: rezamt-at-gmail.com
 **/

contract ERC20Token {
    /** State Variables */
    string public constant name = "E-TOKEN";
    string public constant symbol = "ETOK";
    uint public constant decimals = 18; // 18 is the most common number of decimal places

    /** Events         */

    // Note:
    // The indexed parameters for logged events will
    //    allow you to search for these events
    //  using the indexed parameters as filters.
    // The indexed keyword is only relevant to logged event.
    // Ref: https://ethereum.stackexchange.com/questions/8658/what-does-the-indexed-keyword-do
    event Transfer (address indexed _from, address indexed _to, uint _value);
    event Approval (address indexed _owner, address indexed _spender, uint _value);

    /** Modifiers     */


    /** Functions - External, Public, Internal, Private */

    function totalSupply() external constant returns (uint totalSupply);
    function balanceOf(address _owner) external constant returns (uint balance);
    function transfer(address _to, uint _value) external returns (bool success);
    function transferFrom(address _from, address _to, uint _value) external returns (bool success);
    function approve(address _spender, uint _value) external returns (bool success);
    function allowance(address _owner, address _spender) external constant returns (uint remaining);
}