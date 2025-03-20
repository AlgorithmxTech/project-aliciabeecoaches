import { loginService } from "@/services/register.server";
import { signToken } from "@/utils/jwt";
import { NextApiRequest,NextApiResponse } from "next";

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    try {
        const data = req.body
        const response = await loginService(data)
        const token = await signToken(response!.id)
        res.status(200).json({access_token:token})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error})
    }
}