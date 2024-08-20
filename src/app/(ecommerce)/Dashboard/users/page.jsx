// src/app/(ecommerce)/Dashboard/users/page.jsx
import { connectDB } from "@/utils/connect";
import { User } from "@/models/userModel";
import UserList from "@/components/UsersList";
import React from "react";

// Server component
const Users = async () => {
  await connectDB();

  const users = await User.find().lean();

  return <UserList users={users} />;
};

export default Users;
