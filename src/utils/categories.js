"use server";
import connectDB from "@/utils/connect"; // Ensure this connects to your MongoDB
import { Category } from "@/models/userModel";
import { revalidatePath } from "next/cache";

export const CreateCategory = async (formData, image, id) => {
  // Ensure the database connection is established
  //   await connectDB();

  // Extract name from FormData
  const name = formData.get("name");

  if (!name || !image) {
    return { error: "Please fill all fields" };
  }

  try {
    let category;

    if (id) {
      // Update an existing category
      category = await Category.findByIdAndUpdate(
        id,
        { name, image },
        { new: true, runValidators: true }
      );

      if (!category) {
        return { error: "Category not found" };
      }
    } else {
      // Create a new category
      category = await Category.create({ name, image });
    }

    if (!category) {
      return { error: `Category not ${id ? "updated" : "created"}` };
    }

    // Revalidate the path for categories dashboard
    revalidatePath("/dashboard/categories");

    return { result: category };
  } catch (error) {
    console.error(error);
    return { error: `Category not ${id ? "updated" : "created"}` };
  }
};

export const getCategories = async () => {
  let categories;
  try {
    // await connectDB(); // Connect to MongoDB

    categories = await Category.find();
    if (!categories.length) {
      return { error: "Categories not found" };
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    return { error: "Categories not found" };
  }

  // Revalidate the path if needed
  // revalidatePath("/dashboard/products"); // Ensure this function is available and imported

  return { result: categories };
};
