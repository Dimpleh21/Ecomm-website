import React from "react";
import Title from "./Title";
import { Star } from "lucide-react";
import Favorite from "./Favourite";
import EyeItem from "./EyeItem";
import AddToCart from "./AddToCart";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
const FlashSales = ({ title, heading }) => {
  return (
    <div className="py-16 ml-15 mt-10 bg-white">
      <Title title={title} heading={heading} />
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="">
                <div
                  className="bg-secondaryColor rounded-md h-64 bg-no-repeat bg-cover bg-center relative"
                  style={{
                    backgroundImage: `url(./wh1.jpg)`,
                  }}
                >
                  <div className="absolute right-4 top-5 flex flex-col gap-2">
                    <Favorite />
                    <EyeItem />
                  </div>
                  <AddToCart product="product name">
                    <div className="absolute bottom-0 hover:bg-red-950 w-full hover:text-white text-center text-sm p-2 cursor-pointer">
                      Add to cart
                    </div>
                  </AddToCart>
                </div>
                <h2 className="text-sm py-2">Product Name</h2>
                <div>
                  <span className="text-sm text-red-950 mr-2">Rs.250</span>
                  <span className="text-sm text-gray-400 line-through">
                    350
                  </span>
                </div>
                <div className="flex items-center">
                  <Star
                    size={15}
                    className="text-yellow-400"
                    fill="rgb(250 204 21)"
                  />
                  <p className="ms-2 text-sm font-bold text-gray-900">4.95</p>
                  <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full"></span>
                  <div className="text-sm font-medium text-gray-900 underline hover:no-underline">
                    72 Reviews
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-[75%] lg:left-[92%] top-[-25px] bg-slate-300" />
        <CarouselNext className="absolute right-0 top-[-25px] bg-slate-300" />
      </Carousel>
      <Link href="/products" className="flex justify-center mt-10">
        <Button className="bg-red-950 text-white">View all products</Button>
      </Link>
    </div>
  );
};

export default FlashSales;
