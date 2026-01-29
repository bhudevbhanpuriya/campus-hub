import { eventRepo } from "./event.repo";
import { clubService } from "../clubs/club.service";
import { rsvpRepo } from "./rsvp.repo";

export const eventService = {
  async createEvent(data: {
    title: string;
    description: string;
    date: Date;
    venue: string;
    clubId: string;
    createdBy: string;
  }) {
    const { title, description, date, venue, clubId, createdBy } = data;

    if (!title || !description || !date || !venue || !clubId || !createdBy) {
      throw new Error("Missing required fields");
    }

    const isAllowed = await clubService.isClubAdmin(createdBy, clubId);
    if (!isAllowed) {
      throw new Error("Only club admins can create events");
    }

    if (new Date(date) < new Date()) {
      throw new Error("Event date cannot be in the past");
    }

    const event = await eventRepo.createEvent({
      title,
      description,
      date,
      venue,
      clubId,
      createdBy,
    });

    return {
      id: event._id,
      title: event.title,
      date: event.date,
      venue: event.venue,
    };
  },

  async getEvent(eventId: string) {
    if (!eventId) throw new Error("Event ID required");

    const event = await eventRepo.findById(eventId);
    if (!event) throw new Error("Event not found");

    return event;
  },

  async listEvents() {
    return eventRepo.listUpcomingEvents();
  },

  async rsvpEvent(
    userId: string,
    eventId: string,
    status: "GOING" | "INTERESTED" | "NOT_GOING"
  ) {
    if (!userId || !eventId || !status) {
      throw new Error("Missing required fields");
    }

    const event = await eventRepo.findById(eventId);
    if (!event) throw new Error("Event not found");

    // Business rules
    if (event.createdBy.toString() === userId) {
      throw new Error("Cannot RSVP to your own event");
    }

    if (event.date < new Date()) {
      throw new Error("Event already started");
    }

    // Upsert RSVP
    const prevRSVP = await rsvpRepo.findUserRSVP(userId, eventId);

    if (!prevRSVP && status !== "NOT_GOING") {
      await eventRepo.incrementRsvpCount(eventId);
    }

    if (prevRSVP && status === "NOT_GOING") {
      await eventRepo.decrementRsvpCount(eventId);
    }

    await rsvpRepo.createOrUpdateRSVP({userId, eventId, status});

    return { success: true, status };
  },
};
