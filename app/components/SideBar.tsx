"use client";
import React from 'react';

const SideBar = () => {
  return (
    <div className=' flex flex-col w-1/6 min-h-screen bg-stone-800 mt-22 px-2'>
      <div className='text-lg font-semibold text-stone-300 mb-2 px-6 py-2 w-[220px] tracking-wide border-2 rounded-lg border-stone-800 hover:text-stone-500 bg-stone-900 cursor-pointer'>
        Library
      </div>

      <div className='text-lg font-semibold text-stone-300 mb-2 px-6 py-2 w-[220px] tracking-wide border-2 rounded-lg border-stone-800 hover:text-stone-500 bg-stone-800 hover:bg-stone-900 cursor-pointer'>
        Study Plan
      </div>

      <div className='text-sm font-semibold text-stone-300 mt-16 px-6 tracking-wider hover:text-stone-600 cursor-pointer'>
        My_List
      </div>
    </div>
  );
};

export default SideBar;
