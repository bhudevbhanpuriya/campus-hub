import { clubController } from "@/server/clubs/club.controller";
import { NextRequest } from "next/server";

export async function POST(
    req:NextRequest,
    {params} : {params: { clubId: string}}
) {
    const { clubId } = await params;
    return clubController.joinClub(req , clubId);
}