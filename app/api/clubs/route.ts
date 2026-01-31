import { clubController } from "@/server/clubs/club.controller";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest){
    return clubController.createClub(req);
}
