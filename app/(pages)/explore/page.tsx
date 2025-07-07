import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel-1"
import Background from "../../components/Background"


const page = () => {
  return (
 <div className="relative min-h-screen min-w-screen bg-stone-800 overflow-hidden">
  {/* Background behind everything */}
  <div className="absolute inset-0 z-0">
    <Background />
  </div>

  {/* Main Content on top */}
  <div className="relative z-10">
    <div className="pt-36 pl-64 text-sm text-orange-100 tracking-widest">
      Welcome to
    </div>

    <div className="pt-4 pl-64 text-3xl  text-orange-300 tracking-widest z-50">
      MeetCode Explore
    </div>
    </div>

    <div className="pt-150 pl-16 text-2xl font-semibold text-stone-400 tracking-widest">
      FEATURED
    </div>

    <div className="pl-6 pt-16">
      <Carousel>
        <CarouselContent>
          <CarouselItem className="basis-1/4"><img src="/poster1.png" /></CarouselItem>
          <CarouselItem className="basis-1/4"><img src="/poster2.png" /></CarouselItem>
          <CarouselItem className="basis-1/4"><img src="/poster3.png" /></CarouselItem>
          <CarouselItem className="basis-1/4"><img src="/poster4.png" /></CarouselItem>
          <CarouselItem className="basis-1/4"><img src="/poster5.png" /></CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
     <div className="pt-40 pl-16 text-2xl font-semibold text-stone-400 tracking-widest">
      INTERVIEW
    </div>

    <div className="pl-6 pt-16">
      <Carousel>
        <CarouselContent>
          <CarouselItem className="basis-1/4"><img src="/poster4.png" /></CarouselItem>
          <CarouselItem className="basis-1/4"><img src="/poster3.png" /></CarouselItem>
          <CarouselItem className="basis-1/4"><img src="/poster5.png" /></CarouselItem>
          <CarouselItem className="basis-1/4"><img src="/poster1.png" /></CarouselItem>
          <CarouselItem className="basis-1/4"><img src="/poster2.png" /></CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
     <div className="pt-40 pl-16 text-2xl font-semibold text-stone-400 tracking-widest">
      LEARN
    </div>

    <div className="pl-6 pt-16 pb-20">
      <Carousel>
        <CarouselContent>
          <CarouselItem className="basis-1/4"><img src="/poster3.png" /></CarouselItem>
          <CarouselItem className="basis-1/4"><img src="/poster2.png" /></CarouselItem>
          <CarouselItem className="basis-1/4"><img src="/poster1.png" /></CarouselItem>
          <CarouselItem className="basis-1/4"><img src="/poster4.png" /></CarouselItem>
          <CarouselItem className="basis-1/4"><img src="/poster5.png" /></CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  </div>

  )
}

export default page