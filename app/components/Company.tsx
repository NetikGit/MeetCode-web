import React from 'react'
import CompanyButton from './CompanyButton'

const CompaniesBox = () => {
  return (
    <div className='flex flex-col justify-content w-[260px] h-full  bg-stone-800 rounded-xl'>
        <div className=' pt-2 pl-2 pb-2 text-medium text-white text-light '> Trending Companies</div>
        <div>
            <input className='bg-stone-500 rounded-xl ml-4 pl-2 text-stone-900'
            placeholder='search companies'
            type='text'></input>
        </div>
        <div className='grid grid-cols-2 pt-2'>
            <CompanyButton />
        </div>
            
        
    
    </div>
  )
}

export default CompaniesBox
