import mongoose, { Schema, Model, Types } from "mongoose";

export type ThreadEntityType = "EVENT" | "CLUB";

export interface IThread {
  entityType: ThreadEntityType;
  entityId: Types.ObjectId;
  createdAt?: Date;
}

const ThreadSchema = new Schema<IThread>(
  {
    entityType: { type: String, enum: ["EVENT", "CLUB"], required: true },
    entityId: { type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const Thread: Model<IThread> =
  mongoose.models.Thread || mongoose.model<IThread>("Thread", ThreadSchema);

export default Thread;
