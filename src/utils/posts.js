"use server";
import { Product } from "@/models/userModel"; // Ensure the correct model file is imported
import { connectDB } from "./connect"; // Assumes you have a file to handle DB connection
import { revalidatePath } from "next/cache"; // Ensure you are using the correct path for revalidation

export const addUpdatePost = async (formData, images, categoryId, id) => {
  await connectDB();

  const name = formData.get("name");
  const description = formData.get("description");
  const price = parseFloat(formData.get("price"));

  console.log("Received data:", {
    name,
    description,
    price,
    images,
    categoryId,
    id,
  });

  if (!name || !description || isNaN(price) || !images.length || !categoryId) {
    return { error: "Please fill all fields correctly" };
  }

  const imageList =
    images.length && !id ? images.map(({ url }) => url) : images;

  let product;

  try {
    if (id) {
      product = await Product.findByIdAndUpdate(
        id,
        { name, description, price, images: imageList, categoryId },
        { new: true, runValidators: true }
      ).lean();
    } else {
      product = new Product({
        name,
        description,
        price,
        images: imageList,
        categoryId,
      });

      await product.save();
    }

    if (!product) {
      return { error: "Product not created or updated" };
    }

    revalidatePath("/dashboard/products");
    console.log("Product result:", product);
    return { result: product };
  } catch (error) {
    console.error("Error creating or updating product:", error);
    return { error: "Product not created or updated" };
  }
};
