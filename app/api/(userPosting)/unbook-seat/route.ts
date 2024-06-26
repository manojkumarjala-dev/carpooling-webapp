import connect from '@/lib/mongodb';
import CarpoolPost from '@/model/Posting';
import User from '@/model/User';
import { NextResponse } from 'next/server';
import { auth } from '@/app/auth';
import { ObjectId } from 'mongodb';

export const POST = auth(async function POST(req) {
  await connect();
  if (!req.auth) {
    return new NextResponse("Not Authorized", {
      status: 404
    });
  }
  const { postId } = await req.json();
  const id = req.auth.user?.id;
  try {
    const user = await User.findById(id);
    if (!user) {
      return new NextResponse(JSON.stringify({ error:"User not found"}), {
        status: 404
      });
    }

    const carpoolPost = await CarpoolPost.findById(postId);
    if (!carpoolPost) {
      return new NextResponse(JSON.stringify({ error:"Carpool post not found"}), {
        status: 404
      });
    }

    if (!carpoolPost.occupants.some((occupant: ObjectId) => occupant.toString() === id)) {
      return new NextResponse(JSON.stringify({ error:"User is not an occupant"}), {
        status: 400
      });
    }

    carpoolPost.occupants = carpoolPost.occupants.filter((occupant: ObjectId) => occupant.toString() !== id);
    carpoolPost.occupiedSeats -= 1;
    carpoolPost.availableSeats += 1;

    await carpoolPost.save();
    return new NextResponse(JSON.stringify({ error:"Unbooking successful"}), {
      status: 200
    });
  } catch (error:any) {
    return new NextResponse(JSON.stringify({error: error.toString()}), {
      status: 500
    });
  }
});
