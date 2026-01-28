import { IComment } from "../models/comment.model";
import Thread from "../models/thread.model";
import { commentRepo } from "./comment.repo";

export const commentService = {
    async addComment(data: IComment) {
        const { threadId, userId, parentCommentId } = data;

        if (!threadId || !userId) {
            throw new Error("Missing required fields");
        }

        const thread = await Thread.findById(threadId);
        if (!thread) throw new Error("Thread not found");

        if (parentCommentId) {
            const parent = await commentRepo.findById(parentCommentId.toString());
            if (!parent) throw new Error("Parent comment not found");
        }

        const comment = await commentRepo.createComment(data);
        return comment;
    },

    async voteComment(commentId: string, userId: string, vote: "UPVOTE" | "DOWNVOTE") {
        const comment = await commentRepo.findById(commentId);
        if (!comment) throw new Error("Comment not found");

        let updatedComment;

        if (vote === "UPVOTE") {
            updatedComment = await commentRepo.incrementUpvotes(commentId);
        } else {
            updatedComment = await commentRepo.incrementDownvotes(commentId);
        }

        return updatedComment;
    },

    async getThreadComments(threadId : string){
        const comments = await commentRepo.listRootComments(threadId);
        return comments;
    }
}  