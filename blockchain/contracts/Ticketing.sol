
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./NftFactory.sol";

contract Ticketing {
    
    NftFactory private nftFactory;
    mapping(uint256 => string) public milestoneNftURIs;

    struct Ticket {
        uint256 id;
        string eventName;
        string eventDescription;
        uint256 eventDate;
        uint256 price;
        address owner;
        address club;
        string nftURI;
    }

    uint256 private ticketIdCount;
    address public dummyClub = 0x1234567890123456789012345678901234567890;
    address public realMadridWalletAddress = 0xbDA5747bFD65F08deb54cb465eB87D40e51B197E;

    mapping(address => Ticket[]) public ticketsInSale;
    mapping(address => uint256) public attendedEvents;
    mapping(uint256 => Ticket) public allTickets;


    /**
     * 
     * @dev Initialize the contract with some real milestone NFT URIs.
     */
    constructor() {
        ticketIdCount = 0;
        nftFactory = NftFactory(dummyClub);

        milestoneNftURIs[1] = "https://example.com/milestone1.json";
        milestoneNftURIs[10] = "https://example.com/milestone2.json";
        milestoneNftURIs[50] = "https://example.com/milestone3.json";
        milestoneNftURIs[100] = "https://example.com/milestone4.json";

        Ticket memory initialTicket = Ticket({
            id: 0,
            eventName: "Initial Event",
            eventDescription: "This is an initial event for testing purposes.",
            eventDate: block.timestamp + 1 days,
            price: 0.0001 ether,
            owner: address(0),
            club: realMadridWalletAddress,
            nftURI: ""
        });

        ticketsInSale[realMadridWalletAddress].push(initialTicket);
        allTickets[0] = initialTicket;
        ticketIdCount++;
    }

    function addTicketForSale(
        address club,
        string memory eventName,
        string memory eventDescription,
        uint256 eventDate,
        uint256 price,
        address nftContract,
        string memory nftURI
    ) external {

        require(club != address(0), "Club address cannot be zero");
        require(bytes(eventName).length > 0, "Event name cannot be empty");
        require(eventDate > block.timestamp, "Event date must be in the future");
        
        if (nftContract != address(0)) {
            require(bytes(nftURI).length > 0, "NFT image URI cannot be empty");
        }

        Ticket memory newTicket = Ticket({
            id: ticketIdCount,
            eventName: eventName,
            eventDate: eventDate,
            price: price,
            eventDescription: eventDescription,
            owner: msg.sender,
            club: club,
            nftURI: nftURI
        });

        ticketsInSale[club].push(newTicket);
        allTickets[ticketIdCount] = newTicket;
        ticketIdCount++;
    }

    function getTicketsForClub(address club) external view returns (Ticket[] memory) {
        return ticketsInSale[club];
    }

    function removeTicketFromSale(address club, uint256 ticketId) private {
        Ticket[] storage tickets = ticketsInSale[club];
        uint256 indexToRemove = type(uint256).max;
        for (uint256 i = 0; i < tickets.length; i++) {
            if (tickets[i].id == ticketId) {
                indexToRemove = i;
                break;
            }
        }

        require(indexToRemove != type(uint256).max, "Ticket not found");

        for (uint256 i = indexToRemove; i < tickets.length - 1; i++) {
            tickets[i] = tickets[i + 1];
        }
        tickets.pop();

        delete allTickets[ticketId];
    }

    function buyTicket(address club, uint256 ticketId) external payable {
        Ticket[] storage tickets = ticketsInSale[club];
        require(ticketId < tickets.length, "Invalid ticket ID");
        Ticket storage ticket = tickets[ticketId];

        require(msg.value >= ticket.price, "Insufficient payment");
        require(ticket.eventDate > block.timestamp, "Cannot buy ticket for past event");

        ticket.owner = msg.sender;
        attendedEvents[msg.sender]++;

        if (bytes(ticket.nftURI).length > 0) {
            nftFactory.mintNFT(msg.sender, ticket.nftURI);
        }
        
        payable(club).transfer(msg.value);
        removeTicketFromSale(club, ticketId);

        if (bytes(milestoneNftURIs[attendedEvents[msg.sender]]).length > 0) {
            nftFactory.mintNFT(msg.sender, milestoneNftURIs[ticketId]);
        }
    }

    function getAllTickets() external view returns (Ticket[] memory) {
        Ticket[] memory all = new Ticket[](ticketIdCount);
        for (uint256 i = 0; i < ticketIdCount; i++) {
            all[i] = allTickets[i];
        }
        return all;
    }
    
}
