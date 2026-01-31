import { NextRequest, NextResponse } from "next/server";
import { eventService } from "./event.service";

export const eventController = {
  // POST /api/events
  async createEvent(req: NextRequest) {
    try {
      const body = await req.json();
      const { title, description, date, venue, clubId, createdBy } = body;

      if (
        !title ||
        !description ||
        !date ||
        !venue ||
        !clubId ||
        !createdBy
      ) {
        return NextResponse.json(
          { success: false, error: "Missing required fields" },
          { status: 400 }
        );
      }

      const event = await eventService.createEvent({
        title,
        description,
        date: new Date(date), // ensure Date type
        venue,
        clubId,
        createdBy,
      });

      return NextResponse.json(
        { success: true, data: event },
        { status: 201 }
      );
    } catch (error: any) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }
  },

  // GET /api/events/:eventId
  async getEvent(
    _req: NextRequest,
    eventId: string
  ) {
    try {
      if (!eventId) {
        return NextResponse.json(
          { success: false, error: "Event ID required" },
          { status: 400 }
        );
      }

      const event = await eventService.getEvent(eventId);

      return NextResponse.json(
        { success: true, data: event },
        { status: 200 }
      );
    } catch (error: any) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 404 }
      );
    }
  },

  // GET /api/events
  async listEvents() {
    try {
      const events = await eventService.listEvents();

      return NextResponse.json(
        { success: true, data: events },
        { status: 200 }
      );
    } catch (error: any) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }
  },

  // POST /api/events/:eventId/rsvp
  async rsvpEvent(
    req: NextRequest,
    eventId: string
  ) {
    try {
      const body = await req.json();
      const { userId, status } = body;

      if (!userId || !status) {
        return NextResponse.json(
          { success: false, error: "Missing required fields" },
          { status: 400 }
        );
      }

      const result = await eventService.rsvpEvent(
        userId,
        eventId,
        status
      );

      return NextResponse.json(
        { success: true, data: result },
        { status: 200 }
      );
    } catch (error: any) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }
  },
};
