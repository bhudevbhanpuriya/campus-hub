import mongoose, { Schema, Model, Types } from "mongoose";

export interface IComment {
  threadId: Types.ObjectId | string;
  userId: Types.ObjectId | string;
  parentCommentId?: Types.ObjectId | string | null;
  content: string;
  upvotes?: number;
  downvotes?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const CommentSchema = new Schema<IComment>(
  {
    threadId: { type: Schema.Types.ObjectId, ref: "Thread", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    parentCommentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    content: { type: String, required: true },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Comment: Model<IComment> =
  mongoose.models.Comment ||
  mongoose.model<IComment>("Comment", CommentSchema);

export default Comment;
