// pages/api/occupySeat.js
import connect from '@/lib/mongodb';
import CarpoolPost from '@/model/Posting';
import User from '@/model/User';
import { NextResponse } from 'next/server';
import { auth } from '@/app/auth';
export const POST = auth(async function POST(req) {
  await connect();
  if(!req.auth){
    return new NextResponse(JSON.stringify({ error: "Not Authorized"}), {
        status: 404
      });
  }
    const { postId } = await req.json();
    console.log(postId)
    const email = req.auth.user?.email
    try {
      const user = await User.findOne({email: email});
      if (!user) {
        return new NextResponse(JSON.stringify({ error: "User not found"}), {
            status: 404
          });
      }

      const carpoolPost = await CarpoolPost.findById(postId);
      if (!carpoolPost) {
        return new NextResponse(JSON.stringify({ error: "Carpool post not found"}), {
            status: 404
          });
      }
      console.log(carpoolPost.user)
      console.log(user._id)
      if(carpoolPost.user.equals(user._id)){
        return new NextResponse(JSON.stringify({ error: "Bad Request"}), {
          status: 400
        });
      }

      if (carpoolPost.occupiedSeats >= carpoolPost.availableSeats) {
        return new NextResponse(JSON.stringify({ error: "No available seats"}), {
            status: 400
          });
      }

      if(carpoolPost.user === user._id){
        return new NextResponse(JSON.stringify({ error: "You cannot make the request"}), {
          status: 400
        });
      }
      if(carpoolPost.occupants.includes(user._id)){
        return new NextResponse(JSON.stringify({ error: "Already booked"}), {
          status: 400
        });
      }
      carpoolPost.occupiedSeats += 1;
      carpoolPost.availableSeats -=1;
      carpoolPost.occupants.push(user._id);

      await carpoolPost.save();
      return new NextResponse(JSON.stringify({ error: "Request Succesfull"}), {
        status: 200
      });
    } catch (error: any) {
        return new NextResponse(JSON.stringify({error: error.toString()}), {
            status: 500
          });
    }
  }
)