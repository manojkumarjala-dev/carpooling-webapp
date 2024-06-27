import NextAuth, {  CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/db";
import bcrypt from 'bcryptjs';
import { compare } from "bcryptjs";
import { NextResponse } from 'next/server';
import { use } from "react";
import connect from "@/lib/mongodb";
import User from "@/model/User";
export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        
            const email = credentials?.email as string;
            const password = credentials?.password as string;
            console.log(email,password)
          if (!email || !password) {
            throw new CredentialsSignin("Please provide both email & password");
          }
          console.log("OCCURING")
          await connect()
          const user = await User.findOne({ email }).select("+password");

        if (!user) {
          throw new Error("Invalid email or password");
        }

        if (!user.password) {
          throw new Error("Invalid email or password");
        }

        const isMatched = await compare(password, user.password);

        if (!isMatched) {
          throw new Error("Password did not matched");
        }

        const userData = {        
          email: user.email,
          id: user._id,
        };

        return userData;
        
      },
    }),
  ],
  callbacks:{

    async jwt({ token, user }) {
      // Include user ID in the token if it's not already present
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {

      if (token.id && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
    
  },
  pages: {
    signIn: '/signin'
  }
}
);

