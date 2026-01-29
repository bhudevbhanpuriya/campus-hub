import { commentRepo } from "./comment.repo";
import { threadRepo } from "../threads/thread.repo";

export const commentService = {
  async addComment(data: {
    threadId: string;
    userId: string;
    content: string;
    parentCommentId?: string;
  }) {
    const { threadId, userId, content, parentCommentId } = data;

    if (!threadId || !userId || !content) {
      throw new Error("Missing required fields");
    }

    const thread = await threadRepo.findById(threadId);
    if (!thread) throw new Error("Thread not found");

    if (parentCommentId) {
      const parent = await commentRepo.findById(parentCommentId);
      if (!parent) throw new Error("Parent comment not found");

      if (parent.threadId.toString() !== threadId) {
        throw new Error("Parent comment belongs to another thread");
      }
    }

    return commentRepo.createComment({
      threadId,
      userId,
      content,
      parentCommentId,
    });
  },

  async listRootComments(threadId: string) {
    if (!threadId) throw new Error("Thread ID required");
    return commentRepo.listRootComments(threadId);
  },

  async listReplies(parentCommentId: string) {
    if (!parentCommentId) throw new Error("Parent comment ID required");
    return commentRepo.listReplies(parentCommentId);
  },
};
