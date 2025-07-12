// src/components/SectionContainer.jsx
import React, { useState } from 'react';
import ButtonAddToCart from '../image/buttonAddToCart.svg'
import { ethers } from 'ethers';
import contractABI from './TicketingABI.json';
const contractAddress = '0x...'; 

const provider = new ethers.providers.Web3Provider(window.ethereum);
const contract = new ethers.Contract(contractAddress, contractABI, provider);

const MerchShop = ({MerchList}) => {
  const getTickets = async (clubAddress) => {
    try {
      const tickets = await contract.getTicketsForClub(clubAddress);

      // Convertir BigNumber -> number et formater
      const parsedTickets = tickets.map(ticket => ({
        id: ticket.id.toNumber(),
        eventName: ticket.eventName,
        eventDescription: ticket.eventDescription,
        eventDate: new Date(ticket.eventDate.toNumber() * 1000).toISOString(),
        price: ethers.utils.formatEther(ticket.price),
        owner: ticket.owner,
        club: ticket.club,
        nftURI: ticket.nftURI
      }));

      console.log("Tickets JSON:", parsedTickets);
      return parsedTickets;

    } catch (err) {
      console.error('Erreur récupération tickets :', err);
      return [];
    }
  };
  const TicketsList=getTickets(contractAddress);

  return (
    <div className='w-full flex flex-wrap gap-x-6 gap-y-12 justify-start'>
      {TicketsList.map((item,index)=>(
        <div key={index} className="w-[302px] h-[468px] opacity-100 pb-6 gap-4 rounded-[16px] shadow-[0px_16px_20px_-8px_rgba(17,12,34,0.1)] relative top-[195px] left-[128px]">
          {/*<img src={item.itemPhoto} alt='' className='w-[320px] h-[320px] mb-3'/>*/}
          <div className="flex flex-col opacity-100  px-6 gap-1">
            <p className="font-specialGothic font-semibold text-[14px] leading-[32px] tracking-[-0.01em] align-middle text-[#004170]"> {item.eventName} </p>
            <p className="font-inter font-semibold text-[14px] leading-[24px] tracking-normal align-middle text-[#8D8A95]">Price</p>
            <p className="font-inter font-semibold text-[18px] leading-[24px] tracking-normal align-middle text-[#110C22]">{item.price} CHZ</p>
            <img src={ButtonAddToCart} alt='' className='ml-auto cursor-pointer' onClick={() => alert("Button Add to carte")}/>
          </div>

        </div>
      ))

      }
    </div>
  );
};

export default MerchShop;
