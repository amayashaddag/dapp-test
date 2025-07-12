// src/components/SectionContainer.jsx
import React, { useState } from 'react';
import Header from '../components/header/Header';
import LogoPSG from '../components/image/LogoPSG.svg';
import MerchPSG from '../components/image/PSGMerch.svg';
import MerchShop from '../components/LandingPageFeatures/MerchShop';

const LandingPage = () => {
    const [logos, setLogos] = useState([
  {
    logo: LogoPSG ,
    secondarycolor: "rgba(0, 65, 112, 1)"
  }
]);
const MerchList = [
  {
    itemName: "PSG Home ",
    itemPrice: "85",
    itemPhoto: MerchPSG
  },
  {
    itemName: "PSG Scarf Limited Edition",
    itemPrice: "25",
    itemPhoto: MerchPSG
  },
  {
    itemName: "PSG Training Jacket",
    itemPrice: "120",
    itemPhoto: MerchPSG
  },
  {
    itemName: "PSG Cap Navy",
    itemPrice: "30",
    itemPhoto: MerchPSG
  },
  {
    itemName: "PSG Socks Pack",
    itemPrice: "15",
    itemPhoto: MerchPSG
  },
    {
    itemName: "PSG Socks Pack",
    itemPrice: "15",
    itemPhoto: MerchPSG
  },
    {
    itemName: "PSG Socks Pack",
    itemPrice: "15",
    itemPhoto: MerchPSG
  },
];

  return (
    <>
    <Header clubsList={logos}/>
    <MerchShop />
    </>
  );
};

export default LandingPage;
