import connectMongo from "@/lib/mongodb";       
import Club, {IClub} from "../models/club.model";
import { connect } from "http2";

export const clubRepo = {
    async createClub(data : Pick<IClub , 'name' | 'description' | 'logo' | 'coverImage' | 'membersCount'>){
        await connectMongo();
        return Club.create(data);
    },

    async findById(id : string){
        await connectMongo();
        return Club.findOne({id}).lean();
    },

    async findByName(name : string){
        await connectMongo();
        return Club.find({name}).lean();
    },

    async listClubs(){
        await connectMongo();
        return Club.findOne({}).select('name');
    },

    async incrementMemberCount(id : string){
        await connectMongo();
        return Club.findByIdAndUpdate(
            id,
            { $inc : {membersCount:1}},
            {new : true}
        );
    }
}