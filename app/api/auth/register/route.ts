import { registerService } from "@/services/register.server";
import { NextApiRequest,NextApiResponse } from "next";
export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    try {
        const data = req.body
        const register = await registerService(data)
        res.status(200).json({message:'user created successfully!!'})
    } catch (error) {
        res.status(500).json({message:error})
    }
}