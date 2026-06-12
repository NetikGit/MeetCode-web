import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className="flex items-center justify-between bg-stone-900 z-50 px-6 py-3 border-b border-stone-800">
      <div className="flex items-center gap-6">
        <span className="text-xl font-medium text-orange-200 tracking-widest">
          <Link href="/">MeetCode</Link>
        </span>
        <span className="text-sm font-light text-orange-100 tracking-widest hover:text-orange-400">
          <Link href="/explore">Explore</Link>
        </span>
        <span className="text-sm font-light text-orange-100 tracking-widest hover:text-orange-400">
          <Link href="/problems">Problems</Link>
        </span>
        <span className="text-sm font-light text-orange-100 tracking-widest hover:text-orange-400">
          <Link href="/contest">Contest</Link>
        </span>
        <span className="text-sm font-light text-orange-100 tracking-widest hover:text-orange-400">
          <Link href="/discuss">Discuss</Link>
        </span>
        <span className="text-sm font-light text-orange-100 tracking-widest hover:text-orange-400">
          <Link href="/interview">InterView</Link>
        </span>
        <span className="text-sm font-light text-orange-100 tracking-widest hover:text-orange-400">
          <Link href="/store">Store</Link>
        </span>
      </div>
      <div className="flex items-center gap-6">
        <span className="text-sm font-light text-orange-100 tracking-widest hover:text-orange-400">
          <Link href="/register">Register</Link>
        </span>
        <span className="text-sm font-light text-orange-100 tracking-widest hover:text-orange-400">
          <Link href="/signin">SignIn</Link>
        </span>
      </div>
    </div>
  )
}

export default Navbar

