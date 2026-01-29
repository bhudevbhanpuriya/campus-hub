import mongoose, { Schema, Model, Types } from "mongoose";

export type RSVPStatus = "GOING" | "INTERESTED" | "NOT_GOING";

export interface IRSVP {
  userId: Types.ObjectId | string;
  eventId: Types.ObjectId | string;
  status: RSVPStatus;
  createdAt?: Date;
}

const RSVPSchema = new Schema<IRSVP>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    status: {
      type: String,
      enum: ["GOING", "INTERESTED"],
      required: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

RSVPSchema.index({ userId: 1, eventId: 1 }, { unique: true });

const RSVP: Model<IRSVP> =
  mongoose.models.RSVP || mongoose.model<IRSVP>("RSVP", RSVPSchema);

export default RSVP;
