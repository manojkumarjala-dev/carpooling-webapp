// pages/api/occupySeat.js
import connect from '@/lib/mongodb';
import CarpoolPost from '@/model/Posting';
import { NextResponse } from 'next/server';
import { auth } from '@/app/auth';

export async function GET(req: Request ,{ params }: { params: { slug: string } }) {
  await connect();
  const slug = params.slug

    try {
      const posting = await CarpoolPost.findById(slug);
      if (!posting) {
        return new NextResponse("Posting not found", {
            status: 404
          });
      }

      return new NextResponse(JSON.stringify({ posting }),{
        status:200,
    })

    } catch (error: any) {
        return new NextResponse(error.toString(), {
            status: 500
          });
    }
  }