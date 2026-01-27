import connectMongo from "@/lib/mongodb";
import RSVP , {IRSVP , RSVPStatus} from "../models/rsvp.model";
import Event from "../models/event.model";

export const rsvpRepo = {
    async createOrUpdateRSVP(data : IRSVP){
        await connectMongo();
        
        const existing = await RSVP.findOne({userId : data.userId , eventId : data.eventId});
        if(existing){
            return existing;
        }

        const newRSVP = await RSVP.create(data);
        return newRSVP;
    },

    async findUserRSVP(userId : string , eventId : string){
        await connectMongo();
        return RSVP.findOne({userId , eventId}).lean();
    },

    async listEventAttendees(eventId : string){
        await connectMongo();
        return RSVP.find({eventId}).populate('userId').lean();
    },

    async listUserEvents(userId : string){
        await connectMongo();
        return RSVP.find({userId}).populate('eventId').lean();
    }
}