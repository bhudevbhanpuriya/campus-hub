import connectMongo from "@/lib/mongodb";
import Comment , {IComment} from "../models/comment.model";  

export const commentRepo = {
    async createComment(data: IComment) {
        await connectMongo();
        return Comment.create(data);
    },

    async findById(commentId: string) {
        await connectMongo();
        return Comment.findById(commentId);
    },

    async updateComment(commentId : string , data : IComment){
        await connectMongo();
        return Comment.findByIdAndUpdate(commentId , data , {new : true});
    },

    async deleteComment(commentId : string){
        await connectMongo();
        return Comment.findByIdAndDelete(commentId);
    },

    async listRootComments(threadId : string){
        await connectMongo();
        return Comment.find({threadId , parentCommentId : null});
    },

    async listReplies (parentCommentId : string){
        await connectMongo();
        return Comment.find({parentCommentId});
    },

    async incrementUpvotes(commentId: string) {
        await connectMongo();
        return Comment.findByIdAndUpdate(
            commentId,
            { $inc: { upvotes: 1 } },
            { new: true } 
        );
    },

    async incrementDownvotes(commentId: string) {
        await connectMongo();
        return Comment.findByIdAndUpdate(
            commentId,
            { $inc: { downvotes: 1 } },
            { new: true }
        );
    }
}