import connect from '@/lib/mongodb';
import CarpoolPost from '@/model/Posting';
import User from '@/model/User';
import { auth } from '@/app/auth';
import { NextResponse } from 'next/server';

export const POST = auth(async function POST(req) {
   
  await connect();

  if (req.method === 'POST') {
    const { startLocation, endLocation, date, time, availableSeats, notes } =await req.json();

    try {
     const email = req.auth?.user?.email
      const user = await User.findOne({email:email});
      if (!user) {
        return new NextResponse("User not found", {
            status: 404
          });
      }

      const carpoolPost = new CarpoolPost({
        user: user._id,
        startLocation,
        endLocation,
        date,
        time,
        availableSeats,
        occupiedSeats: 0,
        occupants: [],
        notes,
      });

      await carpoolPost.save();
      return new NextResponse("Successfull", {
        status: 200
      });
    } catch (error: any) {
        return new NextResponse(error.toString(), {
            status: 500
          });
    }
  } else {
    return new NextResponse('Method not allowed', {
        status: 405
      });
  }
})