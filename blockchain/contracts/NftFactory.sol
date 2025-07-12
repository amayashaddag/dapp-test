// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract NftFactory is ERC721URIStorage, Ownable {

    uint256 private nftIdCount;

    constructor() ERC721("EventTicket", "ETK") {
        nftIdCount = 0;
    }

    function mintNFT(address to, string memory nftURI) external onlyOwner {
        _safeMint(to, nftIdCount);
        _setTokenURI(nftIdCount, nftURI);
        nftIdCount++;
    }

    function burnNft(uint256 tokenId) external onlyOwner {
        _burn(tokenId);
    }

}