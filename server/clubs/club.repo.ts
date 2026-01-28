import connectMongo from "@/lib/mongodb";       
import Club, { IClub } from "../models/club.model";

export const clubRepo = {
    async createClub(data: Pick<IClub, 'name' | 'description' | 'logo' | 'coverImage' | 'membersCount'>) {
        await connectMongo();
        return Club.create(data);
    },

    async findById(id: string) {
        await connectMongo();
        return Club.findById(id).lean(); 
    },

    async findByName(name: string) {
        await connectMongo();
        return Club.findOne({ name }).lean(); 
    },

    async listClubs() {
        await connectMongo();
        return Club.find({}).select('name').lean(); 
    },

    async incrementMemberCount(id: string) {
        await connectMongo();
        return Club.findByIdAndUpdate(
            id,
            { $inc: { membersCount: 1 } },
            { new: true }
        );
    },

    async decrementMemberCount(id: string) {
        await connectMongo();
        return Club.findByIdAndUpdate(
            id,
            { $inc: { membersCount: -1 } },
            { new: true }
        );
    }
}