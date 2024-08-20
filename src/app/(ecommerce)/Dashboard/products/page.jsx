import ProductList from "@/components/ProductList";
import { connectDB } from "@/utils/connect";
import { Product } from "@/models/userModel";
import React from "react";

const Products = async () => {
  const query = {
    take: 10,
    skip: 0,
  };
  await connectDB();

  const prodList = await Product.find().lean();

  return (
    <div className="w-full flex flex-col min-h-screen mx-2 md:mx-12">
      <ProductList prodList={prodList} />
    </div>
  );
};

export default Products;
