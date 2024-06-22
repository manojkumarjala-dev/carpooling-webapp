import { auth } from "@/app/auth";
import { NextRequest, NextResponse } from "next/server";
import Posting from "@/model/Posting";
import connect from "@/lib/mongodb";

export const POST = auth(async (req) => {
if(!req.auth){
    return new NextResponse("Not AAAuthorized",{
        status:404
    })
}
try{
    await connect()
    const { startLocation, endLocation } = await req.json();
    
    if(!startLocation){
        const posts = await Posting.find({endLocation:endLocation})
        return new NextResponse(JSON.stringify({ posts }),{
            status:200,
        })
    }
    else if(!endLocation){
        const posts = await Posting.find({startLocation:startLocation})
        return new NextResponse(JSON.stringify({ posts }),{
            status:200,
        })
    }
    else{
        const posts = await Posting.find({startLocation:startLocation,endLocation:endLocation})
        return new NextResponse(JSON.stringify({ posts }),{
            status:200,
        })
    }
    
}
catch(error: any){
    return new NextResponse(error.toString(),{
        status:500
    })
}
})