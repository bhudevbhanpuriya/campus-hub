import connectMongo from "@/lib/mongodb";
import Event, { IEvent } from "../models/event.model";

// Helper function to transform event from database format to frontend format
function transformEventForFrontend(event: any) {
    const now = new Date();
    const eventDate = new Date(event.date);
    const isToday = eventDate.toDateString() === now.toDateString();

    let status: "UPCOMING" | "TODAY" | "PAST";
    if (eventDate < now && !isToday) {
        status = "PAST";
    } else if (isToday) {
        status = "TODAY";
    } else {
        status = "UPCOMING";
    }

    return {
        id: event._id.toString(),
        title: event.title,
        description: event.description,
        date: event.date.toISOString(),
        venue: event.venue,
        status,
        club: {
            id: event.clubId?._id?.toString() || event.clubId,
            name: event.clubId?.name || "Unknown Club",
            avatar: event.clubId?.logo || `https://api.dicebear.com/9.x/initials/svg?seed=${event.clubId?.name || 'Club'}&backgroundColor=0891b2`,
        },
        attendeeCount: event.rsvpCount || 0,
        interestedCount: 0, // TODO: Calculate from RSVPs
        image: event.image || "/placeholder.svg",
        time: eventDate.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        }),
    };
}

export const eventRepo = {
    async createEvent(data: {
        title: string;
        description: string;
        date: Date;
        venue: string;
        clubId: string;
        createdBy: string;
    }) {
        await connectMongo();
        const exists = await Event.findOne({ title: data.title, clubId: data.clubId });
        if (exists) return exists;

        const newEvent = await Event.create(data);
        return newEvent;
    },

    async findById(eventId: string) {
        await connectMongo();
        const event = await Event.findById(eventId)
            .populate('clubId', 'name logo')
            .lean();

        if (!event) return null;
        return transformEventForFrontend(event);
    },

    async listUpcomingEvents(clubId?: string) {
        await connectMongo();

        const query: any = {
            date: { $gte: new Date() }
        };

        if (clubId) {
            query.clubId = clubId;
        }

        const events = await Event.find(query)
            .populate('clubId', 'name logo')
            .sort({ date: 1 })
            .lean();

        return events.map(transformEventForFrontend);
    },

    async incrementRsvpCount(eventId: string) {
        await connectMongo();
        return Event.findByIdAndUpdate(
            eventId,
            { $inc: { rsvpCount: 1 } },
            { new: true }
        )
    },

    async decrementRsvpCount(eventId: string) {
        await connectMongo();
        return Event.findByIdAndUpdate(
            eventId,
            { $inc: { rsvpCount: -1 } },
            { new: true }
        );
    }
}