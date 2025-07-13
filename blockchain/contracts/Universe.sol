// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./FanToken.sol";
import "./NFT.sol";

contract Universe {
    enum Item {
        FanToken,
        NFT,
        Physical
    }

    struct MarketplaceItem {
        Item itemType;
        address seller;
        address tokenAddress;
        uint256 price;
        uint256 amountOrTokenId;
        string metaData;

        // Only for Physical items
        string title;
        string description;

        bool rewardNFT;
        bool rewardFanToken;
        bool rewardCrypto;
        uint256 rewardAmount;
    }

    address private owner;

    FanToken public psgToken;
    FanToken public realMadridToken;
    FanToken public juventusToken;

    NFT public rewardNFTContract;
    FanToken public rewardFanTokenContract;

    mapping(uint256 => MarketplaceItem) public marketplaceItems;

    uint256 public marketplaceItemCount;

    constructor() {
        owner = msg.sender;

        psgToken = new FanToken("PSG Fan Token", "PSG");
        realMadridToken = new FanToken("Real Madrid Fan Token", "RMD");
        juventusToken = new FanToken("Juventus Fan Token", "JUV");

        rewardNFTContract = new NFT();
        rewardFanTokenContract = psgToken; // or any other token as reward

        psgToken.transferOwnership(owner);
        realMadridToken.transferOwnership(owner);
        juventusToken.transferOwnership(owner);

        marketplaceItemCount = 0;
    }

    function addItemToMarketplace(
        Item itemType,
        address tokenAddress,
        uint256 amountOrTokenId,
        uint256 price,

        string memory title,
        string memory description,

        string memory metaData,

        bool rewardNFT,
        bool rewardFanToken,
        bool rewardCrypto,

        uint256 rewardAmount
    ) external {
        require(price > 0, "Price must be greater than 0");

        if (itemType == Item.NFT) {
            NFT nftContract = NFT(tokenAddress);

            require(nftContract.ownerOf(amountOrTokenId) == msg.sender, "You do not own this NFT");

            require(
                nftContract.getApproved(amountOrTokenId) == address(this) ||
                nftContract.isApprovedForAll(msg.sender, address(this)),
                "Marketplace not approved for NFT"
            );

            nftContract.transferFrom(msg.sender, address(this), amountOrTokenId);
        }

        else if (itemType == Item.FanToken) {
            FanToken tokenContract = FanToken(tokenAddress);

            require(tokenContract.balanceOf(msg.sender) >= amountOrTokenId, "Insufficient fan token balance");
            require(tokenContract.allowance(msg.sender, address(this)) >= amountOrTokenId, "Marketplace not approved for tokens");

            tokenContract.transferFrom(msg.sender, address(this), amountOrTokenId);
        }

        marketplaceItems[marketplaceItemCount] = MarketplaceItem({
            itemType: Item.Physical,
            seller: msg.sender,
            tokenAddress: tokenAddress,
            price: price,
            amountOrTokenId: amountOrTokenId,
            title: title,
            description: description,
            metaData: metaData,
            rewardNFT: rewardNFT,
            rewardFanToken: rewardFanToken,
            rewardCrypto: rewardCrypto,
            rewardAmount: rewardAmount
        });

        marketplaceItemCount++;
    }

    function buyItem(uint256 itemId) external payable {
        MarketplaceItem memory item = marketplaceItems[itemId];
        require(item.price > 0, "Item does not exist");
        require(msg.sender != item.seller, "Cannot buy your own item");
        require(msg.value == item.price, "Incorrect ETH sent");

        payable(item.seller).transfer(msg.value);

        if (item.itemType == Item.NFT) {
            NFT nftContract = NFT(item.tokenAddress);
            nftContract.safeTransferFrom(address(this), msg.sender, item.amountOrTokenId);
        }

        else if (item.itemType == Item.FanToken) {
            FanToken tokenContract = FanToken(item.tokenAddress);
            tokenContract.transfer(msg.sender, item.amountOrTokenId);
        }

        else if (item.itemType == Item.Physical) {
            if (item.rewardNFT) {
                rewardNFTContract.mintNFT(msg.sender, "ipfs://example-metadata-uri");
            }

            if (item.rewardFanToken) {
                rewardFanTokenContract.mint(msg.sender, item.rewardAmount); // ou autre club selon logique métier
            }

            if (item.rewardCrypto) {
                require(address(this).balance >= item.rewardAmount, "Not enough ETH for reward");
                payable(msg.sender).transfer(item.rewardAmount);
            }
        }

        delete marketplaceItems[itemId];
    }

    function getMarketplaceItems() external view returns (MarketplaceItem[] memory) {
        MarketplaceItem[] memory items = new MarketplaceItem[](marketplaceItemCount);
        for (uint256 i = 0; i < marketplaceItemCount; i++) {
            items[i] = marketplaceItems[i];
        }
        return items;
    }

}