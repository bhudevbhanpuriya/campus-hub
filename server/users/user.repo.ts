import connectMongo from "@/lib/mongodb";
import user , {IUser} from "@/server/models/user.model";

export const userRepo = {
    async create(data: Pick<IUser , 'email' | 'passwordHash' |'name'| 'role'>){
        await connectMongo();
        return user.create(data);
    },

    async findByEmail(email : string){
        await connectMongo();
        return user.findOne({email}).lean();
    },

    async findById(id : string){
        await connectMongo();
        return user.findOne({id}).lean();
    },

    async existsByEmail(email : string){
        await connectMongo();
        return user.exists({email});
    }
}

