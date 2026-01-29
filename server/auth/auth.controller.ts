import { NextRequest, NextResponse } from "next/server";
import { authService } from "./auth.service";

export const authController = {
    async register(req:NextRequest){
        try{
            const body = await req.json();
            const {email , password , name} = body;
            const user = await authService.registerUser({email , password, name});

            return NextResponse.json({success:true,user} , {status:201});
        }
        catch(error : any){
            return NextResponse.json({success:false , message:error.message || "Registration failed"} , {status:400})
        }
    },

    async login(req:NextRequest){
        try{
            const body = await req.json();
            const {email , password} = body;
            const user = await authService.loginUser(email , password);

            return NextResponse.json({success:true,user} , {status:200});
        }
        catch(error:any){
            return NextResponse.json({success:false,message : error.message || "Login failed"}, {status:401});
        }
    }
}