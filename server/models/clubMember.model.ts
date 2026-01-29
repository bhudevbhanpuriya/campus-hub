import mongoose, { Schema, Model, Types } from "mongoose";

export type ClubRole = "STUDENT" | "CLUB_ADMIN";

export interface IClubMember {
  userId: Types.ObjectId | string;
  clubId: Types.ObjectId | string;
  role: ClubRole;
  joinedAt: Date;
}

const ClubMemberSchema = new Schema<IClubMember>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  clubId: { type: Schema.Types.ObjectId, ref: "Club", required: true },
  role: {
    type: String,
    enum: ["STUDENT", "CLUB_ADMIN"],
    default: "STUDENT",
  },
  joinedAt: { type: Date, default: Date.now },
});

ClubMemberSchema.index({ userId: 1, clubId: 1 }, { unique: true });

const ClubMember: Model<IClubMember> =
  mongoose.models.ClubMember ||
  mongoose.model<IClubMember>("ClubMember", ClubMemberSchema);

export default ClubMember;
