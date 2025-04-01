import { resetPasswordService } from "@/services/auth.services";
import { message } from "antd";
import { NextResponse } from "next/server";


export async function POST(req:Request){
    try {
        const data = await req.json()
        const result = await resetPasswordService(data)
        return NextResponse.json({message:"Password Reset Successfull"},{status:200})
      } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 })
      }
} 