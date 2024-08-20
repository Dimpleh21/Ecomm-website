import AdminCategories from "@/components/AdminCategories";
import { connectDB } from "@/utils/connect";
import { Category } from "@/models/userModel";
import React from "react";

const Categories = async () => {
  const query = {
    take: 10,
    skip: 0,
  };
  await connectDB();

  const CatList = await Category.find().lean();

  return (
    <div className="w-full flex flex-col min-h-screen mx-2 md:mx-12">
      <AdminCategories CatList={CatList} />
    </div>
  );
};

export default Categories;
