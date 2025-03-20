import {prisma} from '@/utils/prisma'
import bcrypt from 'bcryptjs'

export const loginService = async (data:any)=>{

    const checkEmail = await prisma.admin.findUnique({where:{email:data.email}})

    if(checkEmail){

         throw Error("Email Not Found")
    }
  if(!bcrypt.compare(data.password,checkEmail!.password_hash)){
    throw Error("Password doesn't match")
  }

    

    return await prisma.admin.findUnique({where:{email:data.email}})

}



export const registerService = async (data:any)=>{
    const ifExisit = await prisma.admin.findUnique({where:{email:data.email}})

    if (ifExisit){
        throw Error("Email Already Registed")
    }

    const password_hash = await bcrypt.hash(data.password,10)

    return await prisma.admin.create({
        data:{
            email:data.email,
            password_hash:password_hash,
            username:data.username,
        }
    })
    
}