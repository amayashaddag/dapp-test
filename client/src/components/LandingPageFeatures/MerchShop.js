import React, { useState, useEffect } from 'react';
import ButtonAddToCart from '../image/buttonAddToCart.svg';
import { BrowserProvider, Contract, formatEther, parseEther } from 'ethers';
import contractABI from '../../abi/Ticketing.json';
import { TICKETING_ADDRESS } from '../../config';

const provider = new BrowserProvider(window.ethereum); // Ethers v6
const signer = await provider.getSigner();
const contract = new Contract(TICKETING_ADDRESS, contractABI.abi, signer); // ✅ .abi

const MerchShop = () => {
  const [ticketsList, setTicketsList] = useState([]); // ✅ Initialiser avec un tableau vide
  const handleBuyTicket = async (ticketId) => {
    try {
      const signer = await provider.getSigner(); // 🔐
      const walletAddress = await contract.realMadridWalletAddress(); // 👈 bien appeler la fonction

      const contractWithSigner = new Contract(TICKETING_ADDRESS, contractABI.abi, signer); // ✅

      const tx = await contractWithSigner.buyTicket(walletAddress, ticketId, {
        value: parseEther("0.00001347"), // ou item.price si dynamique
      });

      alert("Transaction envoyée : ", tx.hash);
      await tx.wait();
      alert("Achat effectué !");
    } catch (err) {
      console.error("Erreur lors de l’achat :", err);
      alert("Erreur lors de l’achat");
    }
  };


  useEffect(() => {
    const getTickets = async () => {
      try {
        const walletAddress = await contract.realMadridWalletAddress(); // 👈 ajouter await
        const tickets = await contract.getTicketsForClub(walletAddress);


        const parsed = tickets.map(ticket => ({
          id: Number(ticket.id),
          eventName: ticket.eventName,
          eventDescription: ticket.eventDescription,
          eventDate: new Date(Number(ticket.eventDate) * 1000).toISOString(),
          price: formatEther(ticket.price),
          owner: ticket.owner,
          club: ticket.club,
          nftURI: ticket.nftURI
        }));
        console.log(parsed);
        setTicketsList(parsed); // ✅ On met les tickets dans le state
      } catch (err) {
        console.error("Erreur récupération tickets :", err);
        setTicketsList([]); // en cas d’erreur, on garde un tableau vide
      }
    };

    if (contract.realMadridWalletAddress) {
      getTickets(); // ✅ Appel uniquement si une adresse est fournie
    }
  }, [ticketsList]);

  return (
    <div className='w-full flex flex-wrap gap-x-6 gap-y-12 justify-start'>
      {ticketsList.length > 0 ? (
        ticketsList.map((item) => (
          <div key={item.id} className="w-[302px] h-[468px] pb-6 gap-4 rounded-[16px] shadow-[0px_16px_20px_-8px_rgba(17,12,34,0.1)] relative top-[195px] left-[128px]">
            <div className="flex flex-col px-6 gap-1">
              <p className="font-specialGothic font-semibold text-[14px] text-[#004170]">{item.eventName}</p>
              <p className="font-inter font-semibold text-[14px] text-[#8D8A95]">Price</p>
              <p className="font-inter font-semibold text-[18px] text-[#110C22]">{item.price} CHZ</p>
              <img src={ButtonAddToCart} alt='' className='ml-auto cursor-pointer' onClick={() => handleBuyTicket(item.id) } />
            </div>
          </div>
        ))
      ) : (
        <p className='text-gray-500 mt-10'>Aucun ticket disponible pour ce club.</p>
      )}
    </div>
  );
};

export default MerchShop;
