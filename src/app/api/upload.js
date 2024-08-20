/* eslint-disable import/no-anonymous-default-export */
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async (req, res) => {
  // Only handle POST requests
  if (req.method === "POST") {
    const { image } = req.body;

    // Check if image is provided
    if (!image) {
      return res.status(400).json({ error: "No image provided" });
    }

    try {
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(image, {
        upload_preset: "qwerty", // Optional, if you have an upload preset
      });

      // Send back the URL of the uploaded image
      return res.status(200).json({ url: result.secure_url });
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      return res.status(500).json({ error: "Failed to upload image" });
    }
  } else {
    // Method not allowed
    return res.status(405).json({ error: "Method not allowed" });
  }
};
