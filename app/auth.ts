import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/db";
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
            const email = credentials?.email as string;
            const password = credentials?.password as string;
          if (!email || !password) {
            return null;
          }

          const user = await (await clientPromise)
            .db('test')
            .collection("users")
            .findOne({ email: email });

          if (user && password) {
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (isPasswordCorrect) {
              return user as User;
            } else {
              return null
            }
          } else {
            return null
          }
        } catch (error) {
          console.error(error);
          return null
        }
      },
    }),
  ],
  callbacks:{
    async session({ session, token }) {
      console.log({ sessionToken: token });
      console.log({ session: session });

      if (token.id && session.user) {
        session.user.id = token.id as string;
      }
      console.log({ session: session });
      return session;
    },
  },
}
);

