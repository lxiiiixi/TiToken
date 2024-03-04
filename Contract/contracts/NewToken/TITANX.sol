// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TITANX is ERC20, Ownable {
     constructor()
        ERC20("TITAN X", "TITANX")
        Ownable(msg.sender)
    {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function burn(address account, uint256 amount) public onlyOwner {
        _burn(account, amount);
    }

    function spendAllowance(address owner, address spender, uint256 value) public onlyOwner{
        _spendAllowance(owner, spender, value);
    }
}