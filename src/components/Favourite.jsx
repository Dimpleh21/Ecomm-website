"use client";
import React from "react";
import { Heart } from "lucide-react";
const Favourite = () => {
  return (
    <div className="flex justify-center items-center bg-white p-1.5 rounded-full cursor-pointer">
      <Heart size={20} color="gray" />
    </div>
  );
};

export default Favourite;
