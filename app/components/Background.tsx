"use client";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
 
export default function ThreeDMarqueeDemo() {
  const images = [
  "./image1.png",
  "./image2.png",
  "./image3.png",
  "./image4.png",
  "./image5.png",
  "./image6.png",
  "./image7.png",
    "./image1.png",
  "./image2.png",
  "./image3.png",
  "./image4.png",
  "./image5.png",
  "./image6.png",
  "./image7.png",
  "./image1.png",
  "./image2.png",
  "./image3.png",
  "./image4.png",
  "./image5.png",
  "./image6.png",
  "./image7.png",
  "./image1.png",
  "./image2.png",
  "./image3.png",
  "./image4.png",
  "./image5.png",
  "./image6.png",
  "./image7.png",
  "./image1.png",
  "./image2.png",
  "./image3.png",
  "./image4.png",
  "./image5.png",
  "./image6.png",
  "./image7.png",
  "./image1.png",
  "./image2.png",
  "./image3.png",
  "./image4.png",
  "./image5.png",
  "./image6.png",
  "./image7.png",
  "./image1.png",
  "./image2.png",
  "./image3.png",
  "./image4.png",
  "./image5.png",
  "./image6.png",
  "./image7.png",]
  return (
    <div className="mx-auto my-10 max-w-7xl rounded-3xl bg-zinc-900 p-2 ring-1 ring-neutral-700 dark:bg-neutral-800">
      <ThreeDMarquee images={images} />
    </div>
  );
}