// src/components/SectionContainer.jsx
import React, { useState } from 'react';
import Logo from '../image/logo.svg'; 
import LogoText from '../image/logo_type.svg';
import Xsvg from '../image/X.svg'
import CustomButton from '../buttons/CustomButton';

const Header = ({clubsList}) => {


  const inactiveColor = 'rgba(141, 138, 149, 1)';
  const activeColor = clubsList[0].secondarycolor;
  const baseClasses = "font-inter font-semibold text-[14px] h-[40px] leading-6 cursor-pointer";
  const tabs = ["Merch", "Tickets", "NFTs", "Honors", "Auctions"];
  const [activeTab, setActiveTab] = useState("Merch");

  return (
    <header className="w-full pt-[32px] px-[128px] flex flex-col items-center" 
        style={{ boxShadow: '0px 9px 16.1px 0px rgba(0, 0, 0, 0.25)' }}
    >
        <div className='w-full flex justify-between items-center mb-12'>
            <div className='flex items-center gap-2'>
            <img src={Logo} alt='' />
            <img src={LogoText} alt='' />
            <img src={Xsvg} alt='' />
            <img src={clubsList[0].logo} alt=''/>
            </div>
            <div>
                <CustomButton
                        width="136px"
                        height="40px"
                        text="Connect Wallet"
                        onClick={() => alert("Bouton connect wallet !")}
                />
            </div>
        </div>
        <nav className="flex gap-[200px]">
        {tabs.map((tab) => (
            <p
            key={tab}
            className={baseClasses}
            onClick={() => setActiveTab(tab)}
            style={{
                color: activeTab === tab ? activeColor : inactiveColor,
                borderBottom: activeTab === tab ? `2px solid ${activeColor}` : 'none'
            }}
            >
            {tab}
            </p>
        ))}
        </nav>

    </header>

  );
};

export default Header;
