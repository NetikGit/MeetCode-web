import React from 'react';

const CompaniesDetail = [
  { name: "Amazon", vacancy: 1928, id: 1 },
  { name: "Replit", vacancy: 1028, id: 2 },
  { name: "Google", vacancy: 1208, id: 3 },
  { name: "Flipkart", vacancy: 1632, id: 4 },
  { name: "BharatPay", vacancy: 193, id: 5 },
  { name: "Shopify", vacancy: 1288, id: 6 },
  { name: "Telegram", vacancy: 321, id: 7 },
  { name: "LeetCode", vacancy: 145, id: 8 },
  { name: "Pari", vacancy: 1918, id: 9 },
  { name: "1xBet", vacancy: 168, id: 10 },
  { name: "Shadcn", vacancy: 765, id: 11 },
  { name: "AccternityUI", vacancy: 138, id: 12 },
  { name: "Spotify", vacancy: 108, id: 13 },
  { name: "Steam", vacancy: 1648, id: 14 },
  { name: "Forcenic", vacancy: 17, id: 15 },
];

const CompanyButton = () => {
  return (
    <>
      {CompaniesDetail.map((item) => (
        <div className="flex w-full h-full pt-2 pl-2" key={item.id}>
          <div className="text-sm text-white p-2 bg-stone-900 rounded-xl flex items-center gap-2">
            {item.name}
            <button className="text-xs bg-orange-400 px-2 py-1 rounded-xl">
              {item.vacancy}
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default CompanyButton;
