// src/components/SectionContainer.jsx
import React, { useState } from 'react';
import Cover from '../components/image/Cover.svg'; 
import LandingPageImage  from '../components/image/LandingPageImage.svg'
import CustomButton from '../components/buttons/CustomButton';
import HovredWalletLink from  '../components/image/HovredWalletLink.svg'
import WalletLink from '../components/image/WalletLink.svg'

const LandingPage = () => {
    const [hovredLink,setHovredLink]=useState(false);
  return (
    <div
      className="flex justify-between items-center justify-start gap-4 w-full h-auto px-[64px] py-[128px] rounded-lg "
      style={{
        backgroundImage: `url(${Cover})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
        <div className='flex-row '>
            <p className='text-white mb-8 text-[55px] leading-[72px] tracking-[-0.01em] font-[650]  font-specialGothic  whitespace-pre-line'>
             {`Unelieve your 
              experience with
              your favorite club.`}
            </p>
            <p className="text-white text-[14px] leading-[24px] tracking-normal font-medium font-inter whitespace-pre-line">
             {`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua.`}
            </p>
        </div>
        <div className='flex flex-col items-center pt-40'>
            <img src={LandingPageImage} className='w-[704px] mb-20'/>
            <CustomButton
              width="356px"
              height="40px"
              text="Connect your Socios Wallet"
              onClick={() => alert("Bouton cliqué !")}
            />
            {hovredLink ? <img src={HovredWalletLink} className='mt-8' onMouseLeave={() => setHovredLink(false)}/> : <img src={WalletLink} className='mt-8' onMouseEnter={() => setHovredLink(true)}/> }


        </div>
      
    </div>
  );
};

export default LandingPage;
