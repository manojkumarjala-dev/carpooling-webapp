import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import User from '@/model/User'
import clientPromise from '@/lib/db';
import { NextResponse } from 'next/server';
import connect from '@/lib/mongodb';

const SECRET_KEY = process.env.AUTH_SECRET;

export const POST = async (req: Request) => {
  const { email, password, username } = await req.json();
  if(!email || !password || !username){
    return new NextResponse(JSON.stringify({ error:"All Fields Required"}), {
      status: 400
    });
  }

  try {
    await connect();
    // Check if the user already exists
    const user = await User.findOne({ email });
    console.log(user)
    if (user) {
      return new NextResponse(JSON.stringify({ error:"Email already exists"}), {
        status: 400
      });
    }
    const userbyUsername = await User.findOne({username});
    if (userbyUsername) {
      return new NextResponse(JSON.stringify({ error:"Username taken"}), {
        status: 400
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const newUser = new User({
      email,
      password: hashedPassword,
      username,
    });

    try {
        await newUser.save();
      const response = new NextResponse(JSON.stringify({ success:"User Registration successful"}), {
        status: 200,
      });
      return response

    } catch (error: any) {
      return new NextResponse(JSON.stringify({error: error.toString()}), {
        status: 500
      });
    }

  } catch (error: any) {
    return new NextResponse(JSON.stringify({error: error.toString()}), {
      status: 500
    });
  }
};

