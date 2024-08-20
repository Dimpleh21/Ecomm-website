/* eslint-disable react/no-unescaped-entities */
import { staticTime } from "@/utils/data";
import React from "react";
import { Button } from "./ui/button";

const Enhancement = () => {
  return (
    <div className="mt-10 bg-red-950 grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-0 p-10">
      <div className="flex flex-col justify-center gap-5">
        <h2 className="text-white font-bold text-md">Categories</h2>
        <h1 className="text-4xl text-white">Product Of the Day</h1>
        <h3 className="text-l text-white">
          Celebrate life's moments, big and small, with our beautiful and
          versatile traditional footwear. Perfect for any event, any time.
        </h3>
        <div className="flex gap-5">
          {staticTime.map((item, index) => (
            <div
              key={index}
              className="flex justify-center items-center flex-col bg-red-900 h-16 w-16 rounded-full text-xs text-white"
            >
              <p>{item.count}</p>
              <p>{item.time}</p>
            </div>
          ))}
        </div>
        <Button className="bg-yellow-700 w-28 hover:bg-red-900">Buy Now</Button>
      </div>
      <div className="text-center ">
        <img src="/wh1.jpg" alt="" />
      </div>
    </div>
  );
};

export default Enhancement;
