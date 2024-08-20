"use client";
import FormInput from "@/components/FormInput";
import FormSubmit from "@/components/FormSubmit";
import { toast } from "@/components/ui/use-toast";
import { UploadButton } from "@/utils/uploadthing";
import { register } from "@/utils/actions";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
const Signup = () => {
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();
  const [info, setInfo] = useState({
    username: " ",
    email: " ",
    password: " ",
  });
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  function handleInput(e) {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
    if (!image) {
      console.error("No image to upload");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "your_upload_preset"); // Your upload preset

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      setImageUrl(data.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!info.name || !info.email || !info.password) {
      setError("Must provide all the credentials.");
      return;
    }
    console.log("Submitting info:", info); // Add this log
    try {
      setPending(true);
      await uploadImage();
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });
      if (res.ok) {
        setPending(false);
        e.target.reset();
        const form = e.target;
        form.reset();
        router.push("/login");
        console.log("user registered");
      } else {
        const errorData = await res.json();
        setError(errorData.message);
        setPending(false);
      }
    } catch (error) {
      setPending(false);
      setError("Something went wrong");
      console.error("Error during registration:", error); // Add this log
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="h-screen bg-[#cbe3e9]">
        <img src="./signup.png" alt="" />
      </div>
      <div className="p-[15%] bg-white">
        <h1 className="text-2xl font-medium">Create an account</h1>
        <form onSubmit={handleSubmit}>
          <input
            id="name"
            name="name"
            label="Full Name"
            placeholder="Enter your name"
            type="text"
            className="h-10"
            onChange={handleInput}
          />
          <input
            id="email"
            name="email"
            label="Email"
            placeholder="Enter your email"
            type="email"
            className="h-10"
            onChange={handleInput}
          />
          <input
            id="password"
            name="password"
            label="Password"
            placeholder="Enter the password"
            type="password"
            className="h-10 mb-10"
            onChange={handleInput}
          />
          {/* <UploadButton
            endpoint="imageUploader"
            appearance={{
              button:
                "ut-uploading:cursor-not-allowed bg-slate-600 w-full text-xl after:bg-orange-400 max-w-[700px]",
              allowedContent: "hidden",
            }}
            onClientUploadComplete={(res) => {
              setImage(res[0].url);
            }}
            onUploadError={(error) => {
              alert(`ERROR ${error.message}`);
            }}
          /> */}
          <div>
            <input type="file" onChange={handleImageChange} />
            <button onClick={uploadImage}>Upload Image</button>
            {imageUrl && <img src={imageUrl} alt="Uploaded" />}
          </div>

          {error && <span className="message">{error}</span>}
          <button
            className="w-full bg-red-500 text-white h-12 hover:bg-red-400 mt-10"
            type="submit"
            disabled={pending ? true : false}
          >
            {pending ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
