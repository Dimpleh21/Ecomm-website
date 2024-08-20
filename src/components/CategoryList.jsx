import React from "react";
import Title from "./Title";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";

const CategoryList = ({ categories }) => {
  return (
    <div>
      <Title title="Categories" heading="Browse By Category" />
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
              <Link href={`/`}>
                <div className="border-2 bg-secondaryColor rounded-md h-40 flex justify-center items-center flex-col gap-2">
                  <img src="./wh1.jpg" className="w-20 h-20" alt="" />
                  <p>juttis</p>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-[75%] lg:left-[92%] top-[-25px] bg-slate-300" />
        <CarouselNext className="absolute right-0 top-[-25px] bg-slate-300" />
      </Carousel>
    </div>
  );
};

export default CategoryList;
