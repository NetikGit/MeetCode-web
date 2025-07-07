"use client"
import React from 'react'
import Problems from './components/problems';
import SideBar from './components/SideBar';
import CompaniesBox from './components/Company';
import Background from "./components/Background"
import GridDistortion from './components/GridDistortion';

 function Home() {
  return(
  <>
 <div className='pt-6'>
 <p className='absolute top-[200px] left-[200px] z-50 text-7xl text-stone-800 font-bold  '>MeetCode </p> 
<div style={{ width: '100%', height: '600px', position: 'relative' }}>
 
  <GridDistortion
    imageSrc="./image.png"
    grid={10}
    mouse={0.1}
    strength={0.15}
    relaxation={0.9}
    className="custom-class"
  />
</div>
 
 </div>
  
  </>
  )
}

export default Home;
