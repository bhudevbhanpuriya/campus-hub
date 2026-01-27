import connectMongo from "@/lib/mongodb";   
import Event , {IEvent} from "../models/event.model";

export const eventRepo = {
    async createEvent(data : IEvent){
        await connectMongo();
        const exists =  await Event.findOne({title :data.title ,clubId : data.clubId});
        if(exists) return exists;

        const newEvent = await Event.create(data);
        return newEvent;
    },

    async findById(eventId : string){
        await connectMongo();
        return Event.findById(eventId).lean();
    },

    async listUpcomingEvents(clubId? : string){
        await connectMongo();

        const query: any = { 
            date: { $gte: new Date() } 
        };

        if (clubId) {
            query.clubId = clubId;
        }

        return Event.find(query).sort({data:1}).lean();
    },

    async incrementRsvpCount(eventId :string){
        await connectMongo();
        return Event.findByIdAndUpdate(
            eventId,
            { $inc : {rsvpCount : 1} },
            { new : true}
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