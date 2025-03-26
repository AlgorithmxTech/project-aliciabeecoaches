import { requestPasswordResetService } from "@/services/auth.services";
import { message } from "antd";
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const data = await req.json()
        const result = await requestPasswordResetService(data)
        return NextResponse.json({message:"Request sent to your email"},{status:200})
    }catch(error:any){
        return NextResponse.json(
            { error: error.message || "An unexpected error occurred" },
            { status: 400 }
          );
    }

}