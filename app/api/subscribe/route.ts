import MailerLite from "@mailerlite/mailerlite-nodejs";
import { message } from "antd";
import { NextResponse } from "next/server";

const mailerlite = new MailerLite({
    api_key: process.env.MAILER_LITE_API_KEY || "" 
})


export async function POST(req:Request){

    const {email} = await req.json()

    try {
        if(!email){
            return NextResponse.json({error:"Please Enter Your Email!"},{status:404})
        }

       const response = await mailerlite.subscribers.createOrUpdate({
            email
        })

        return NextResponse.json({message:"Subscribed Succsfully"},{status:201})

    } 
        catch (error: any) {
            return NextResponse.json({ error: error.message || 'Failed to subscribe' }, { status: 500 })
    }
}