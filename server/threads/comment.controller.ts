import { NextRequest, NextResponse } from "next/server";
import { commentService } from "./comment.service";

export const commentController = {
  async createComment(
    req: NextRequest,
    { params }: { params: { threadId: string } }
  ) {
    try {
      const { userId, content, parentCommentId } = await req.json();
      const { threadId } = params;

      if (!userId || !content) {
        return NextResponse.json(
          { success: false, error: "Missing required fields" },
          { status: 400 }
        );
      }

      const comment = await commentService.addComment({
        threadId,
        userId,
        content,
        parentCommentId,
      });

      return NextResponse.json(
        { success: true, data: comment },
        { status: 201 }
      );
    } catch (err: any) {
      return NextResponse.json(
        { success: false, error: err.message },
        { status: 400 }
      );
    }
  },

  async listComments(
    req: NextRequest,
    { params }: { params: { threadId: string } }
  ) {
    try {
      const comments = await commentService.listRootComments(
        params.threadId
      );

      return NextResponse.json(
        { success: true, data: comments },
        { status: 200 }
      );
    } catch (err: any) {
      return NextResponse.json(
        { success: false, error: err.message },
        { status: 400 }
      );
    }
  },

  async listReplies(
    req: NextRequest,
    { params }: { params: { commentId: string } }
  ) {
    try {
      const replies = await commentService.listReplies(params.commentId);

      return NextResponse.json(
        { success: true, data: replies },
        { status: 200 }
      );
    } catch (err: any) {
      return NextResponse.json(
        { success: false, error: err.message },
        { status: 400 }
      );
    }
  },
};
