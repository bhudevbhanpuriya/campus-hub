import connectMongo from "@/lib/mongodb";
import Thread , {IThread , ThreadEntityType} from "../models/thread.model";

export const threaRepo = {
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