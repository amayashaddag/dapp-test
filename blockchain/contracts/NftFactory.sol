// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NftFactory is ERC721 {
    uint256 private _counter;

    constructor() ERC721("MyNFT", "MNFT") {}

    function mint() public {
        _mint(msg.sender, _counter);
        _counter++;
    }
}
