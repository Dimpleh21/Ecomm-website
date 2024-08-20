import mongoose from "mongoose";

// Define User Schema
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String },
  emailVerified: { type: Boolean, default: false },
  token: { type: String, unique: true },
  role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
  createdAt: { type: Date, default: Date.now },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  // favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Favorite" }],
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);

// Define Product Schema
const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String }],
  views: { type: Number, default: 1 },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  // You can add OrderItem and Favorite relationships if needed
});

export const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

const categorySchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

export const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);
