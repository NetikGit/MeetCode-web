"use client"
import React from "react";
import Data from "../Data"; // Make sure this file exports the array named `Data`
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel-1"

const Problems = () => {
    const router = useRouter()
    const handleClick = (id : Number) =>{
        router.push(`/question/${id}`)
    }
  return (
    <div>     
<Carousel>
  <CarouselContent>
    <CarouselItem className="basis-1/3"><img src="/poster1.png" /></CarouselItem>
    <CarouselItem className="basis-1/3"><img src="/poster2.png" /></CarouselItem>
    <CarouselItem className="basis-1/3"><img src="/poster3.png" /></CarouselItem>
    <CarouselItem className="basis-1/3"><img src="/poster4.png" /></CarouselItem>
    <CarouselItem className="basis-1/3"><img src="/poster5.png" /></CarouselItem>
  </CarouselContent>
</Carousel>
    <div className="flex justify-center items-center mt-12 min-h-screen bg-stone-950">
    <table className="min-w-[600px] bg-stone-800 border  rounded-xl">
        <thead>
          <tr className="border border-gray-800 rounded-xl">
            <th className="text-xl font-light text-gray-400 px-6 py-2 text-left">Problems</th>
            <th className="text-xl font-light text-gray-400 px-6 py-2 text-left">Acceptance Rate</th>
            <th className="text-xl font-light text-gray-400 px-6 py-2 text-left">Difficulty</th>
          </tr>
        </thead>
        <tbody>
          {Data.map((item) => (
            <tr key={item.id} className="text-white border-t  border-gray-700  hover:bg-stone-500 rounded-xl">
              <td className=" flex gap-2 px-6 py-3" onClick={()=>handleClick(item.id)} >{item.id} {item.question} </td>
              <td className="px-6 py-3">{item.acceptance}</td>
              <td
                className={`px-6 py-3 ${
                  item.difficulty === "Easy"
                    ? "text-green-400"
                    : item.difficulty === "Medium"
                    ? "text-yellow-400"
                    : "text-red-400"
                }`}
              >
                {item.difficulty}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Problems;

