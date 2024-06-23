// pages/api/occupySeat.js
import connect from '@/lib/mongodb';
import CarpoolPost from '@/model/Posting';
import User from '@/model/User';
import { NextResponse } from 'next/server';
import { auth } from '@/app/auth';
export const POST = auth(async function POST(req) {
  await connect();
  if(!req.auth){
    return new NextResponse("Not Authorized", {
        status: 404
      });
  }
    const { postId } = await req.json();
    console.log(postId)
    const email = req.auth.user?.email
    try {
      const user = await User.findOne({email: email});
      if (!user) {
        return new NextResponse("User not found", {
            status: 404
          });
      }

      const carpoolPost = await CarpoolPost.findById(postId);
      if (!carpoolPost) {
        return new NextResponse("Carpool post not found", {
            status: 404
          });
      }
      console.log(carpoolPost.user)
      console.log(user._id)
      if(carpoolPost.user.equals(user._id)){
        return new NextResponse("Bad Request", {
          status: 400
        });
      }

      if (carpoolPost.occupiedSeats >= carpoolPost.availableSeats) {
        return new NextResponse("No available seats", {
            status: 400
          });
      }

      if(carpoolPost.user === user._id){
        return new NextResponse("You cannot make the request", {
          status: 400
        });
      }
      if(carpoolPost.occupants.includes(user._id)){
        return new NextResponse("Already booked", {
          status: 400
        });
      }
      carpoolPost.occupiedSeats += 1;
      carpoolPost.occupants.push(user._id);

      await carpoolPost.save();
      return new NextResponse("Request Succesfull", {
        status: 200
      });
    } catch (error: any) {
        return new NextResponse(error.toString(), {
            status: 500
          });
    }
  }
)