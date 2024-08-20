import { connectDB } from "@/utils/connect";
import { NextResponse } from "next/server";
import { User } from "@/models/userModel";
import bcrypt from "bcrypt";
function generateToken(length) {
  let result = "";
  const charactorLength = process.env.NEXT_PUBLIC_CHARACTERS.length;

  for (let i = 0; i < length; i++) {
    result += process.env.NEXT_PUBLIC_CHARACTERS.charAt(
      Math.floor(Math.random() * charactorLength)
    );
  }

  return result;
}
let token = generateToken(32);
export async function POST(req) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();
    console.log("Received data:", { name, email, password, token }); // Debugging line
    const exists = await User.findOne({ $or: [{ email }, { name }] });
    if (exists) {
      return NextResponse.json(
        { message: "Username or email already exists" },
        { status: 500 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword, token });
    return NextResponse.json({ message: "User Registered" }, { status: 201 });
  } catch (error) {
    console.error("Error while registering user", error); // Debugging line
    console.log("Error while registering user", error);
    return NextResponse.json(
      { message: "Error while registering user" },
      { status: 500 }
    );
  }
}
