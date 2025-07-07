import React from 'react'
import Link from 'next/link'
const Navbar = () => {
  return (
    <div className='flex justify-content item-center bg-stone-900 z-50'>
      <span className='text-xl font-thin text-orange-200 tracking-widest px-2 py-6'> MeetCode</span>
      <span className='text-sm font-thin text-orange-100 tracking-widest ml-4 px-3 py-6 hover:text-orange-400'><Link href="/explore"> Explore</Link></span>
       <span className='text-sm font-thin text-orange-100 tracking-widest px-3 py-6 hover:text-orange-400'><Link href = "/problems"> Problems </Link></span>
      <span className='text-sm font-thin text-orange-100 tracking-widest px-3 py-6 hover:text-orange-400'><Link href = "/contest"> Contest</Link></span>
      <span className='text-sm font-thin text-orange-100 tracking-widest px-3 py-6 hover:text-orange-400'><Link href = "/discuss"> Discuss</Link></span>
      <span className='text-sm font-thin text-orange-100 tracking-widest px-3 py-6 hover:text-orange-400'><Link href = "/interview"> InterView</Link></span>
      <span className='text-sm font-thin text-orange-100 tracking-widest px-3 py-6 hover:text-orange-400'><Link href = "/store"> Store</Link></span>
      <span className='text-sm font-thin text-orange-100 tracking-widest ml-146 px-6 py-6 hover:text-orange-400'><Link href = "/register"> Register</Link></span>
      <span className='text-sm font-thin text-orange-100 tracking-widest px-6 py-6 hover:text-orange-400'><Link href = "/signin"> SingnIn</Link></span>
    </div>
  )
}

export default Navbar
