import { NextRequest, NextResponse } from "next/server";
import { eventService } from "./event.service";

export const eventController = {
    async createEvent(req: NextRequest) {
        try {
            const body = await req.json();
            const event = await eventService.createEvent(body);
            return NextResponse.json(event, { status: 201 });
        } catch (error: any) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
    },

    async getEvent(req: NextRequest) {
        try {
            const { searchParams } = new URL(req.url);
            const eventId = searchParams.get("eventId");

            if (!eventId) {
                return NextResponse.json({ error: "Event ID is required" }, { status: 400 });
            }

            const event = await eventService.getEvent(eventId);
            
            if (!event) {
                return NextResponse.json({ error: "Event not found" }, { status: 404 });
            }

            return NextResponse.json(event, { status: 200 });
        } catch (error: any) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    },

    async listEvents(req: NextRequest) {
        try {
            const { searchParams } = new URL(req.url);
            const clubId = searchParams.get("clubId") || undefined;

            const events = await eventService.listEvents();
            return NextResponse.json(events, { status: 200 });
        } catch (error: any) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    },

    async rsvpEvent(req: NextRequest) {
        try {
            const { userId, eventId, status } = await req.json();

            if (!userId || !eventId || !status) {
                return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
            }

            const event = await eventService.rsvpEvent(userId, eventId, status);
            return NextResponse.json(event, { status: 200 });
        } catch (error: any) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
    }
}