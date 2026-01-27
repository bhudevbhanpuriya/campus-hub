import connectMongo from "@/lib/mongodb";
import Thread , {IThread , ThreadEntityType} from "../models/thread.model";

export const threaRepo = {
    async createThread(data : IThread){
        await connectMongo();
        return Thread.create(data);
    }
}