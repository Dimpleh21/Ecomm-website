import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import { connect } from "http2";
import { User } from "@/models/userModel";
import bcrypt from "bcrypt";
import { connectDB } from "@/utils/connect";
async function login(credentials) {
  try {
    connectDB();
    const user = await User.findOne({ email: credentials.email });
    if (!user) throw new Error("Wrong credentials");
    const isCorrect = await bcrypt.compare(credentials.password, user.password);
    if (!isCorrect) {
      throw new Error("Wrong credentials");
    }
    return user;
  } catch (error) {
    console.log(error);
    console.log("Error while logging in");
    throw new Error("Something went wrong");
  }
}

export const authOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (error) {
          throw new Error("Failed to login");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.id = user.id;
      }
      console.log("JWT token:", token); // Debugging line
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.id = token.id;
      }
      return session;
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
