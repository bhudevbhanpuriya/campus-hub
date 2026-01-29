import { NextRequest, NextResponse } from "next/server";
import { commentService } from "./comment.service";

export const commentController = {
  async createComment(req: NextRequest) {
    try {
      const body = await req.json();
      const { threadId, userId, content, parentCommentId } = body;

      if (!threadId || !userId || !content) {
        return NextResponse.json(
          { error: "Missing required fields" },
          { status: 400 }
        );
      }

      const comment = await commentService.addComment({
        threadId,
        userId,
        content,
        parentCommentId: parentCommentId ?? null,
      });

      return NextResponse.json(comment, { status: 201 });
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
  },

  async voteComment(req: NextRequest) {
    try {
      const body = await req.json();
      const { commentId, userId, vote } = body;

      if (!commentId || !userId || !vote) {
        return NextResponse.json(
          { error: "Missing fields" },
          { status: 400 }
        );
      }

      const result = await commentService.voteComment(
        commentId,
        userId,
        vote
      );

      return NextResponse.json(result, { status: 200 });
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
  },

  async getComment(req: NextRequest) {
    try {
      const { searchParams } = new URL(req.url);
      const commentId = searchParams.get("commentId");

      if (!commentId) {
        return NextResponse.json(
          { error: "Comment ID required" },
          { status: 400 }
        );
      }

      const comment = await commentService.getComment(commentId);
      return NextResponse.json(comment, { status: 200 });
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
  },

  async listComments(req: NextRequest) {
    try {
      const { searchParams } = new URL(req.url);
      const threadId = searchParams.get("threadId");

      if (!threadId) {
        return NextResponse.json(
          { error: "Thread ID required" },
          { status: 400 }
        );
      }

      const comments = await commentService.listRootComments(threadId);
      return NextResponse.json(comments, { status: 200 });
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
  },

  async listReplies(req: NextRequest) {
    try {
      const { searchParams } = new URL(req.url);
      const parentCommentId = searchParams.get("parentCommentId");

      if (!parentCommentId) {
        return NextResponse.json(
          { error: "Parent Comment ID required" },
          { status: 400 }
        );
      }

      const replies = await commentService.listReplies(parentCommentId);
      return NextResponse.json(replies, { status: 200 });
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
  },

  async deleteComment(req: NextRequest) {
    try {
      const body = await req.json();
      const { commentId } = body;

      if (!commentId) {
        return NextResponse.json(
          { error: "Comment ID required" },
          { status: 400 }
        );
      }

      const result = await commentService.deleteComment(commentId);
      return NextResponse.json(result, { status: 200 });
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
  },
};
