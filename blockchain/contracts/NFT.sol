// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC721URIStorage {
    uint256 private tokenIdCount;
    address private owner;

    constructor() ERC721("MyNFT", "MNFT") {
        owner = msg.sender;
        tokenIdCount = 0;
    }

    function mintNFT(address to, string memory tokenURI) external {
        require(msg.sender == owner, "Only owner can mint NFTs");
        uint256 newTokenId = tokenIdCount;
        tokenIdCount++;
        _mint(to, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
    }

    function burnNFT(uint256 tokenId) external {
        require(msg.sender == owner, "Only owner can mint NFTs");
        _burn(tokenId);
    }
}
