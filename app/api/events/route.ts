import { eventController } from "@/server/events/event.controller";
import { NextRequest } from "next/server";

export async function POST(req : NextRequest){
    return eventController.createEvent(req);
}

export async function GET(){
    return eventController.listEvents()
}