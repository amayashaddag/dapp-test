// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FanToken is ERC20 {
    address private owner;
    string private URI;

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        owner = msg.sender;
    }

    function mint(address to, uint256 amount) external {
        require(msg.sender == owner, "Only owner can mint tokens");
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external {
        require(msg.sender == owner, "Only owner can burn tokens");
        _burn(from, amount);
    } 

    function setURI(string memory uri) external {
        require(msg.sender == owner, "Only owner can set URI");
        URI = uri;
    }
}