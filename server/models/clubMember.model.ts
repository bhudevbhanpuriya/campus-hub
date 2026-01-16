import mongoose, { Schema, Model } from "mongoose";

export interface IClub {
  name: string;
  description: string;
  logo?: string;
  coverImage?: string;
  membersCount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const ClubSchema = new Schema<IClub>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    membersCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model overwrite in Next.js hot reload
const Club: Model<IClub> =
  mongoose.models.Club || mongoose.model<IClub>("Club", ClubSchema);

export default Club;
