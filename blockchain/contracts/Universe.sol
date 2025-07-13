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
        uint256 id;
        Item itemType;
        address seller;
        address tokenAddress;
        uint256 price;
        uint256 amountOrTokenId;
        string metaData;
        string title;
        bool rewardNFT;
        bool rewardFanToken;
        bool rewardCrypto;
        uint256 rewardAmount;
    }

    address private owner;

    FanToken public psgToken;
    FanToken public realMadridToken;
    FanToken public juventusToken;

    NFT public nftCollection1;
    NFT public nftCollection2;
    NFT public rewardNFTAddress;

    mapping(uint256 => MarketplaceItem) public marketplaceItems;
    mapping(address => mapping(string => uint256)) public userFanTokenBalances;

    MarketplaceItem[] public testMarketplaceItems;
    uint256 public marketplaceItemCount;

    constructor() {
        owner = msg.sender;

        psgToken = new FanToken("PSG Fan Token", "PSG");
        realMadridToken = new FanToken("Real Madrid Fan Token", "RMD");
        juventusToken = new FanToken("Juventus Fan Token", "JUV");

        marketplaceItemCount = 0;

         // Deploy NFT collections
        nftCollection1 = new NFT();
        nftCollection2 = new NFT();
        rewardNFTAddress = new NFT();

        // Mint NFTs
        nftCollection1.mintNFT(address(this), "ipfs://messi-poster"); // tokenId 0
        nftCollection2.mintNFT(address(this), "ipfs://stadium-night"); // tokenId 0
        rewardNFTAddress.mintNFT(address(this), "ipfs://vip-ticket"); // tokenId 0

        // Mint fan tokens
        psgToken.mint(address(this), 1000);
        juventusToken.mint(address(this), 1000);
        realMadridToken.mint(address(this), 1000);

        // Add NFT 1
        _addItem(
            Item.NFT,
            address(nftCollection1),
            0,
            0.0005 ether,
            '{"title":"Messi Goal Poster","collection":"Legends of PSG","rarity":"Epic","image":"https://media.printler.com/media/photo/192676-2.jpg?rmode=crop&width=638&height=900"}',
            "", false, false, false, 0
        );

        // Add NFT 2
        _addItem(
            Item.NFT, 
            address(nftCollection2),
            0,
            0.00007 ether,
            '{"title":"Stadium Night View","collection":"UCL Memories","rarity":"Rare","image":"https://i.pinimg.com/736x/40/1f/89/401f894d753b4a9faaf78f8481aecedc.jpg"}',
            "", false, false, false, 0
        );

        // Add PSG Fan Token
        _addItem(
            Item.FanToken,
            address(psgToken),
            150,
            0.0003 ether,
            '{"title":"PSG Fan Token","collection":"Fan Tokens","rarity":"Common","image":"https://s2.coinmarketcap.com/static/img/coins/200x200/5226.png","club":"PSG","trend":"up"}',
            "", false, false, false, 0
        );

        // Add JUV Fan Token
        _addItem(
            Item.FanToken,
            address(juventusToken),
            200,
            0.00025 ether,
            '{"title":"Juventus Fan Token","collection":"Fan Tokens","rarity":"Common","image":"https://s2.coinmarketcap.com/static/img/coins/200x200/5224.png","club":"Juventus","trend":"down"}',
            "", false, false, false, 0
        );

        // Add Physical: VIP Match Ticket (with NFT reward)
        _addItem(
            Item.Physical,
            address(rewardNFTAddress),
            0,
            0.00015 ether,
            "",
            "VIP Ticket: PSG vs RMD",
            true, false, false, 0
        );

        // Add Physical: Jersey (Fan token + ETH reward)
        _addItem(
            Item.Physical,
            address(juventusToken),
            0,
            0.0002 ether,
            "",
            "Limited Edition Jersey",
            false, true, true, 0.01 ether
        );

    }

    function _addItem(
        Item itemType,
        address tokenAddress,
        uint256 amountOrTokenId,
        uint256 price,
        string memory metaData,
        string memory title,
        bool rewardNFT,
        bool rewardFanToken,
        bool rewardCrypto,
        uint256 rewardAmount
    ) internal {
        marketplaceItems[marketplaceItemCount] = MarketplaceItem({
            id: marketplaceItemCount,
            itemType: itemType,
            seller: address(this),
            tokenAddress: tokenAddress,
            price: price,
            amountOrTokenId: amountOrTokenId,
            metaData: metaData,
            title: title,
            rewardNFT: rewardNFT,
            rewardFanToken: rewardFanToken,
            rewardCrypto: rewardCrypto,
            rewardAmount: rewardAmount
        });

        marketplaceItemCount++;
    }

    struct AddMarketplaceItemParams {
        Item itemType;
        address tokenAddress;
        uint256 amountOrTokenId;
        uint256 price;
        string title;
        string description;
        string metaData;
        bool rewardNFT;
        bool rewardFanToken;
        bool rewardCrypto;
        uint256 rewardAmount;
    }

    function addItemToMarketplace(AddMarketplaceItemParams calldata params) external {
        require(params.price > 0, "Price must be greater than 0");

        if (params.itemType == Item.NFT) {
            NFT nftContract = NFT(params.tokenAddress);

            require(nftContract.ownerOf(params.amountOrTokenId) == msg.sender, "You do not own this NFT");

            require(
                nftContract.getApproved(params.amountOrTokenId) == address(this) ||
                nftContract.isApprovedForAll(msg.sender, address(this)),
                "Marketplace not approved for NFT"
            );

            nftContract.transferFrom(msg.sender, address(this), params.amountOrTokenId);
        }

        else if (params.itemType == Item.FanToken) {
            FanToken tokenContract = FanToken(params.tokenAddress);

            require(tokenContract.balanceOf(msg.sender) >= params.amountOrTokenId, "Insufficient fan token balance");
            require(tokenContract.allowance(msg.sender, address(this)) >= params.amountOrTokenId, "Marketplace not approved for tokens");

            tokenContract.transferFrom(msg.sender, address(this), params.amountOrTokenId);
        }

        marketplaceItems[marketplaceItemCount] = MarketplaceItem({
            id: marketplaceItemCount,
            itemType: params.itemType,
            seller: msg.sender,
            tokenAddress: params.tokenAddress,
            price: params.price,
            amountOrTokenId: params.amountOrTokenId,
            title: params.title,
            metaData: params.metaData,
            rewardNFT: params.rewardNFT,
            rewardFanToken: params.rewardFanToken,
            rewardCrypto: params.rewardCrypto,
            rewardAmount: params.rewardAmount
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
                nftCollection1.mintNFT(msg.sender, "ipfs://example-metadata-uri");
            }

            if (item.rewardFanToken) {
                psgToken.mint(msg.sender, item.rewardAmount); // ou autre club selon logique métier
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