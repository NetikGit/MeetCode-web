import React from 'react'
const CompaniesDetail = [
    {
        name : "Amazon",
        vacancy : 1928 ,
        id: 1
    },
        {
        name : "replit",
        vacancy : 1028,
            id: 2
    },
        {
        name : "google",
        vacancy : 1208,
            id: 3
    },
        {
        name : "flipcart",
        vacancy : 1632,
            id: 4
    },
        {
        name : "BharatPay",
        vacancy : 193
,            id: 5
    },
        {
        name : "shopify",
        vacancy : 1288,
            id: 6
    },
        {
        name : "telegram",
        vacancy : 321
,            id: 7
    },
        {
        name : "leetcode",
        vacancy : 145
,            id: 8
    },
        {
        name : "Pari",
        vacancy : 1918,
            id: 9
    },
        {
        name : "1xBet",
        vacancy : 168
,            id: 10
    },
        {
        name : "shadcn",
        vacancy : 765
,            id: 11
    },
        {
        name : "accternityUi",
        vacancy : 138
,            id: 12
    },
        {
        name : "spotify",
        vacancy : 108
,            id: 13
    },
        {
        name : "steam",
        vacancy : 1648,
            id: 14
    },
        {
        name : "forecenic",
        vacancy : 17
 ,           id: 15
    },
]
const CompanyButton = () => {
    return (

   
      CompaniesDetail.map((item)=>(
         <div className=' flex w-full h-full pt-2 pl-2  '> 
       <div className='text-sm text-white p-2 bg-stone-900 rounded-xl'key={item.id}>
        {item.name} 
        <button className=' text-xs bg-orange-400 p-1 rounded-xl' key={item.id}>
            {item.vacancy}
        </button>
      </div>
    </div>
    
      ))
  )
}

export default CompanyButton
