// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./FanToken.sol";
import "./NFT.sol";

contract Universe {
    enum Item {
        FanToken,
        NFT
    }

    struct MarketplaceItem {
        Item itemType;
        address seller;
        uint256 price;
        uint256 amountOrTokenId;
    }

    address private owner;

    FanToken public psgToken;
    FanToken public realMadridToken;
    FanToken public juventusToken;

    mapping(uint256 => MarketplaceItem) public marketplaceItems;

    uint256 public marketplaceItemCount;

    constructor() {
        owner = msg.sender;

        psgToken = new FanToken("PSG Fan Token", "PSG");
        realMadridToken = new FanToken("Real Madrid Fan Token", "RMD");
        juventusToken = new FanToken("Juventus Fan Token", "JUV");

        psgToken.transferOwnership(owner);
        realMadridToken.transferOwnership(owner);
        juventusToken.transferOwnership(owner);

        marketplaceItemCount = 0;
    }

    function addItemToMarketplace(
        Item itemType,
        address tokenAddress,
        uint256 amountOrTokenId,
        uint256 price
    ) external {
        require(price > 0, "Price must be greater than 0");

        if (itemType == Item.NFT) {
            ERC721URIStorage nftContract = ERC721URIStorage(tokenAddress);

            require(nftContract.ownerOf(amountOrTokenId) == msg.sender, "You do not own this NFT");

            require(
                nftContract.getApproved(amountOrTokenId) == address(this) ||
                nftContract.isApprovedForAll(msg.sender, address(this)),
                "Marketplace not approved for NFT"
            );

            marketplaceItems[marketplaceItemCount] = MarketplaceItem({
                itemType: Item.NFT,
                seller: msg.sender,
                price: price,
                amountOrTokenId: amountOrTokenId
            });

            nftContract.transferFrom(msg.sender, address(this), amountOrTokenId);
        }

        else if (itemType == Item.FanToken) {
            IERC20 tokenContract = IERC20(tokenAddress);

            require(tokenContract.balanceOf(msg.sender) >= amountOrTokenId, "Insufficient fan token balance");
            require(tokenContract.allowance(msg.sender, address(this)) >= amountOrTokenId, "Marketplace not approved for tokens");

            marketplaceItems[marketplaceItemCount] = MarketplaceItem({
                itemType: Item.FanToken,
                seller: msg.sender,
                price: price,
                amountOrTokenId: amountOrTokenId
            });

            tokenContract.transferFrom(msg.sender, address(this), amountOrTokenId);
        }

        else {
            revert("Unsupported item type");
        }

        marketplaceItemCount++;
    }


}