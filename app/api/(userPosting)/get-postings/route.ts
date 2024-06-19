import { auth } from "@/app/auth";
import { NextRequest, NextResponse } from "next/server";
import Posting from "@/model/Posting";
import connect from "@/lib/mongodb";

export const GET = auth(async (req) => {
if(!req.auth){
    return new NextResponse("Not AAAuthorized",{
        status:404
    })
}
try{
    await connect()
    const posts = await Posting.find({})
    return new NextResponse(`posts:${posts}`,{
        status:200,
    })
}
catch(error: any){
    return new NextResponse(error.toString(),{
        status:500
    })
}
})