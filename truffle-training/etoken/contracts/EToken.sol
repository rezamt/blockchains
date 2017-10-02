pragma solidity ^0.4.0;

import "./ERC20Token.sol";

contract EToken is ERC20Token {
    /** State Variables */

    uint256 public _totalSupply = 100000;
    // Owner of this Token contract
    address public owner;

    // Balances for each account
    mapping (address => uint256) balances;

    // Owner of account approves the transfer of an amount to another account
    mapping (address => mapping (address => uint256)) allowed;

    /** Function Modifiers */

    // Only be executed by the owner
    modifier onlyOwner() {
        if (msg.sender != owner) revert();
        _;
    }

    // Constructor
    function EToken() public {
        owner = msg.sender;
        balances[owner] = _totalSupply;
    }

    function totalSupply() external constant returns (uint totalSupply) {
        totalSupply = _totalSupply;
    }

    function balanceOf(address _owner) external constant returns (uint balance) {
        balance = balances[_owner];
    }

    function transfer(address _to, uint _value) external returns (bool success) {
        if(balances[msg.sender] > _value &&
        _value > 0 &&
        balances[_to] + _value > balances[_to]) {

            balances[msg.sender] -= _value;
            balances[_to] += _value;

            Transfer(msg.sender, _to, _value); // log transfer event
            return true;
        } else {
            return false;
        }
    }

    // Send _value amount of tokens from address _from to address _to
    // The transferFrom method is used for a withdraw workflow, allowing contracts to send
    // tokens on your behalf, for example to "deposit" to a contract address and/or to charge
    // fees in sub-currencies; the command should fail unless the _from account has
    // deliberately authorized the sender of the message via some mechanism; we propose
    // these standardized APIs for approval:
    function transferFrom(address _from, address _to, uint _value) external returns (bool success) {
        if (balances[_from] >= _value
        && allowed[_from][msg.sender] >= _value
        && _value > 0
        && balances[_to] + _value > balances[_to]) {

            balances[_from] -= _value;
            balances[_to] += _value;

            Transfer (_from, _to, _value);
            success = true;
        } else {
            success = false;
        }

    }

    // Allow _spender to withdraw from your account, multiple times, up to the _value amount.
    // If this function is called again it overwrites the current allowance with _value.
    function approve(address _spender, uint _value) external returns (bool success) {
        allowed[msg.sender][_spender] = _value;
        Approval(msg.sender, _spender, _value);
        success = true;
    }



    function allowance(address _owner, address _spender) external constant returns (uint remaining) {
        return allowed[_owner][_spender];
    }

}