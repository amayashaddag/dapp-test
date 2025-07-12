// src/components/SectionContainer.jsx
import React, { useState } from 'react';
import ButtonAddToCart from '../image/buttonAddToCart.svg'

const MerchShop = ({MerchList}) => {

  return (
    <div className='w-full flex flex-wrap gap-x-6 gap-y-12 justify-start'>
      {MerchList.map((item,index)=>(
        <div key={index} className="w-[302px] h-[468px] opacity-100 pb-6 gap-4 rounded-[16px] shadow-[0px_16px_20px_-8px_rgba(17,12,34,0.1)] relative top-[195px] left-[128px]">
          <img src={item.itemPhoto} alt='' className='w-[320px] h-[320px] mb-3'/>
          <div className="flex flex-col opacity-100  px-6 gap-1">
            <p className="font-specialGothic font-semibold text-[14px] leading-[32px] tracking-[-0.01em] align-middle text-[#004170]"> {item.itemName} </p>
            <p className="font-inter font-semibold text-[14px] leading-[24px] tracking-normal align-middle text-[#8D8A95]">Price</p>
            <p className="font-inter font-semibold text-[18px] leading-[24px] tracking-normal align-middle text-[#110C22]">{item.itemPrice} CHZ</p>
            <img src={ButtonAddToCart} alt='' className='ml-auto' onClick={() => alert("Button Add to carte")}/>
          </div>

        </div>
      ))

      }
    </div>
  );
};

export default MerchShop;
