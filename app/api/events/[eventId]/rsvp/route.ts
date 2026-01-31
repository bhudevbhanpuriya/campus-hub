import { eventController } from "@/server/events/event.controller";
import { NextRequest } from "next/server";

export async function PUT(
    req: NextRequest,
    {params} : { params: { eventId: string } }
){
    const {eventId} = await params;
    return eventController.rsvpEvent(req,eventId);
}