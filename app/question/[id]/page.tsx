"use client"
import React from "react";
import { useParams } from "next/navigation";
import Data from "@/app/Data"; // adjust import as needed

const Page = () => {
  const { id } = useParams();
  const questionData = Data.find((q) => q.id.toString() === id);

  if (!questionData) return <p className="text-red-500">Question not found</p>;

  return (
    <div>
      <div className="pt-12 pl-4 text-stone-200 text-2xl font-semibold">
      {questionData.id}. {questionData.question}
      <div className=" flex justify-content item-center text-sm mt-4 p-1 pl-6 w-[100px] bg-stone-700 rounded-xl">
        {questionData.difficulty}
      </div>
      <div className ="text-stone-200 font-light text-base pt-6">
        Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.
      </div>
       <div className ="text-stone-200 font-light text-base pt-4">
        The overall run time complexity should be O(log (m+n)).
      </div>
      <div className="text-stone-200 text-base font-semibold pt-12">
        Example1
      </div>
      <div className="text-stone-200 pt-4 text-base font-light ">
        <span className="text-stone-200 text-base font-bold">Input:</span> nums1 = [1,3], nums2 = [2]
        <p> <span className="text-stone-200 text-base font-bold">Output:</span> 2.00000</p>
        <p> <span className="text-stone-200 text-base font-bold">Explanation:</span>  merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.</p>

      </div>
      
      <div className="text-stone-200 text-base font-semibold pt-6">
        Example2
      </div>
      <div className="text-stone-200 pt-4 text-base font-light ">
        <span className="text-stone-200 text-base font-bold">Input:</span> nums1 = [1,3], nums2 = [2]
        <p> <span className="text-stone-200 text-base font-bold">Output:</span> 2.00000</p>
        <p> <span className="text-stone-200 text-base font-bold">Explanation:</span>  merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.</p>

      </div>
      <div className="text-stone-200 text-base font-semibold pt-12">
  Constraints:
</div>
<ul className=" text-stone-300 list-disc list-inside pl-2 pt-4 pb-8  text-sm font-normal space-y-1">
  <li className="w-1/4 border bg-stone-700 rounded-xl pl-2"><code>nums1.length == m</code></li>
  <li className="w-1/4 border bg-stone-700 rounded-xl pl-2"><code>nums2.length == n</code></li>
  <li className="w-1/4 border bg-stone-700 rounded-xl pl-2"><code>0 &;= m &;= 1000</code></li>
  <li className="w-1/4 border bg-stone-700 rounded-xl pl-2"><code>0 &;= n &;= 1000</code></li>
  <li className="w-1/4 border bg-stone-700 rounded-xl pl-2"><code>1 &;= m + n &;= 2000</code></li>
  <li className="w-1/4 border bg-stone-700 rounded-xl pl-2"><code>-10⁶ &;= nums1[i], nums2[i] &;= 10⁶</code></li>
</ul>
</div>
  </div>
    
  );
};

export default Page;
