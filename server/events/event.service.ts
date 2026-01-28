import { IEvent } from "../models/event.model";
import { eventRepo } from "./event.repo";
import { clubService } from "../clubs/club.service";

export const eventService = {
    async createEvent(data : IEvent){
        const {title, description,date,venue,clubId,createdBy} = data;

        if(!title || !description || !date || !venue || !clubId || createdBy
        ) throw new Error("Fill required fields");

        const isAllowed = await clubService.isClubAdmin(createdBy.toString(), clubId.toString());
        
        if (!isAllowed) {
            throw new Error("Unauthorized: Only Club Admins can create events");
        }

        const event = await eventRepo.createEvent(data);
        
        return event;
    },

    async getEvent(eventId : string){
        const event = await eventRepo.findById(eventId);
        return event
    },

    async listEvents(){
        const events = await eventRepo.listUpcomingEvents();
        return events;
    },

    async rsvpEvent(userId : string , eventId : string, status : "GOING" | "INTERESTED" | "NOT_GOING" ){
        const event = await eventRepo.findById(eventId);
        if(!event) throw new Error("Event not found");  

        if(event.createdBy.toString() === userId) throw new Error("You cannot RSVP to your own event");
        if(event.date < new Date()) throw new Error("Event has already started");

        if(status === "GOING" || status === "INTERESTED"){
            await eventRepo.incrementRsvpCount(eventId);
        }else{
            await eventRepo.decrementRsvpCount(eventId);
        }

        return event;
    }
}