"use server";

// Adjust the path based on your project structure
import connectDB from "@/utils/connect"; // Ensure this connects to your MongoDB
import { Category } from "@/models/userModel"; // Adjust the path based on your project structure
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";

export const deleteFunction = async ({ id, table }) => {
  // const session = await getSession();

  // if (!session?.isLoggedIn) {
  //   return { error: "User not found" };
  // }

  console.log(`deleteFunction called with id: ${id} and table: ${table}`);

  // Ensure the ID is valid
  if (!id || !mongoose.isValidObjectId(id)) {
    console.error(`Invalid ObjectId: ${id}`);
    return { error: "Invalid ID format" };
  }

  // await connectDB(); // Connect to MongoDB

  try {
    let item;

    if (table === "category") {
      item = await Category.findByIdAndDelete(id);
    } else {
      // Add other tables here if needed
      // item = await SomeOtherModel.findByIdAndDelete(id);
    }

    if (!item) {
      console.log(`Item with id ${id} not found in ${table} table`);
      return { error: `${table} not found` };
    }

    // Revalidate the path for categories dashboard
    revalidatePath(
      `/dashboard/${table === "category" ? "categories" : `${table}s`}`
    );

    console.log(`Successfully deleted ${table} with id ${id}`);
    return { result: item };
  } catch (error) {
    console.error(`Error deleting ${table} with id ${id}:`, error);
    return { error: `Error deleting ${table}` };
  }
};
