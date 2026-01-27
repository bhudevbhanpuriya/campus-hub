import connectMongo from "@/lib/mongodb";   
import ClubMember , {IClubMember} from "../models/clubMember.model";
import Club from "../models/club.model";

export const clubMemberRepo = {
    async addMember(data : Pick<IClubMember , 'userId' | 'clubId' | 'role' | 'joinedAt'>){
        await connectMongo();
        const existing = await ClubMember.findOne({userId : data.userId , clubId : data.clubId})
        
        if(existing){
            return existing;
        }

        const newMember = await ClubMember.create(data);
        if(newMember){
            await Club.findByIdAndDelete(data.clubId , {
                $inc : {membersCount : 1}
            })
        }

       return newMember;
    },

    async removeMember(userId:string , clubId :string) {
        await connectMongo();
        const deleteMember = await ClubMember.findOneAndDelete({userId,clubId});
        if(deleteMember){
            await Club.findByIdAndUpdate(
                clubId ,
                {  
                    $inc : {membersCount:-1}
                }
            );
            return {success : true , message : "Member removed and count updated"};
        }

        return {success : false , message : "Member not found"}
    },

    async findMembership(userId : string , clubId : string){
        await connectMongo();
        return ClubMember.findOne({userId , clubId}).lean();
    },

    async listMember(clubId : string){
        await connectMongo();
        return ClubMember.find({clubId}).populate('userId , name avatar email').lean();
    }

}