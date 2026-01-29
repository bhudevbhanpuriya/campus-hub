import connectMongo from "@/lib/mongodb";
import Thread , {IThread , ThreadEntityType} from "../models/thread.model";

export const threadRepo = {
    async createThread(data : IThread){
        await connectMongo();
        return Thread.create(data);
    },

    async findThread(entityType : string , entityId : string){
        await connectMongo();
        return Thread.findOne({entityType , entityId});
    },

    async findById(threadId : string){
        await connectMongo();
        return Thread.findById(threadId);
    }
}