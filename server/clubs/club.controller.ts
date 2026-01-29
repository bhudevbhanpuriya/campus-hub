import { NextRequest, NextResponse } from "next/server";
import { clubService } from "./club.service";

export const clubController = {
    async createClub(req:NextRequest){
        try{
            const body = await req.json();
            const {userId ,name , description, logo, coverImage} = body;
            
            if(!userId){
                return NextResponse.json({error : "User ID is required"}, {status : 400})
            }

            const newClub = await clubService.createClub(userId , {
                name, 
                description,
                logo,
                coverImage
            });

            return NextResponse.json({success : true,newClub} , {status:201});
        }
        catch(error :any){
            return NextResponse.json({error : error.message} , {status:400})
        }
    },

    async joinClub(req:NextRequest){
        try{
            const body = await req.json();
            const { userId , clubId} = body;

            if(!userId || !clubId){
                return NextResponse.json({error : "UserId and ClubId both required"},{status : 400})
            } 

            const memberShip = await clubService.joinClub(userId , clubId);
            return NextResponse.json({success:true , memberShip} , {status : 200})
        }
        catch(error: any){
            return NextResponse.json({error : error.message} , { status : 400})
        }
    },

    async leaveClub(req:NextRequest){
        try{
            const body = await req.json();
            const { userId , clubId} = body;

            if(!userId || !clubId){
                return NextResponse.json({error : "UserId and ClubId both required"},{status : 400})
            } 

            const result = await clubService.leaveClub(userId , clubId);
            return NextResponse.json({success:true , result} , {status : 200})
        }
        catch(error: any){
            return NextResponse.json({error : error.message} , { status : 400})
        }
    }
}