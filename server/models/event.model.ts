import mongoose, { Schema, Model, Types } from "mongoose";

export interface IEvent {
  title: string;
  description: string;
  date: Date;
  venue: string;
  image?: string;
  clubId: Types.ObjectId | string;
  createdBy: Types.ObjectId | string;
  tags: string[];
  rsvpCount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    venue: { type: String, required: true },
    image: String,
    clubId: { type: Schema.Types.ObjectId, ref: "Club", required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tags: { type: [String], default: [] },
    rsvpCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);

export default Event;
