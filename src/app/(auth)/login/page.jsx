/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
const login = () => {
  const router = useRouter();
  const [info, setInfo] = useState({
    email: " ",
    password: " ",
  });
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  function handleInput(e) {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!info.email || !info.password) {
      setError("Must provide all the credentials.");
      return;
    }
    console.log("Submitting info:", info); // Add this log

    try {
      setPending(true);
      const res = await signIn("credentials", {
        email: info.email,
        password: info.password,
        redirect: false,
      });
      if (res.error) {
        setError(res.error);
        setPending(false);
        return;
      }
      router.replace("/");
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

          <button
            className="w-full bg-red-500 text-white h-12 hover:bg-red-400 mt-10"
            type="submit"
            disabled={pending ? true : false}
          >
            {pending ? "Logging in..." : "Login"}
          </button>
          <Link
            href="/signup"
            className="cursor-pointer flex items-center justify-center text-blue-400"
          >
            signup
          </Link>
        </form>
      </div>
    </div>
  );
};

export default login;
