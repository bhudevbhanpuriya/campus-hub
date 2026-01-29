import { commentRepo } from "./comment.repo";
import { threadRepo } from "../threads/thread.repo";

export const commentService = {
  async addComment(data: {
    threadId: string;
    userId: string;
    content: string;
    parentCommentId?: string | null;
  }) {
    const { threadId, userId, content, parentCommentId } = data;

    // 1️⃣ Validation
    if (!threadId || !userId || !content) {
      throw new Error("Missing required fields");
    }

    // 2️⃣ Thread existence
    const thread = await threadRepo.findById(threadId);
    if (!thread) {
      throw new Error("Thread not found");
    }

    // 3️⃣ Parent comment validation
    if (parentCommentId) {
      const parent = await commentRepo.findById(parentCommentId);
      if (!parent) {
        throw new Error("Parent comment not found");
      }

      if (parent.threadId.toString() !== threadId) {
        throw new Error("Parent comment belongs to a different thread");
      }
    }

    // 4️⃣ Create comment
    return commentRepo.createComment({
      threadId,
      userId,
      content,
      parentCommentId: parentCommentId ?? undefined,
    });
  },

  async voteComment(
    commentId: string,
    userId: string,
    vote: "UPVOTE" | "DOWNVOTE"
  ) {
    if (!commentId || !userId || !vote) {
      throw new Error("Missing required fields");
    }

    const comment = await commentRepo.findById(commentId);
    if (!comment) {
      throw new Error("Comment not found");
    }

    if (vote === "UPVOTE") {
      return commentRepo.incrementUpvotes(commentId);
    }

    return commentRepo.incrementDownvotes(commentId);
  },

  async getComment(commentId: string) {
    if (!commentId) {
      throw new Error("Comment ID required");
    }

    const comment = await commentRepo.findById(commentId);
    if (!comment) {
      throw new Error("Comment not found");
    }

    return comment;
  },

  async listRootComments(threadId: string) {
    if (!threadId) {
      throw new Error("Thread ID required");
    }

    return commentRepo.listRootComments(threadId);
  },

  async listReplies(parentCommentId: string) {
    if (!parentCommentId) {
      throw new Error("Parent comment ID required");
    }

    return commentRepo.listReplies(parentCommentId);
  },

  async deleteComment(commentId: string) {
    if (!commentId) {
      throw new Error("Comment ID required");
    }

    const comment = await commentRepo.findById(commentId);
    if (!comment) {
      throw new Error("Comment not found");
    }

    return commentRepo.deleteComment(commentId);
  },
};
