import mongoose, { Schema, Model } from "mongoose";

export type UserRole = "STUDENT" | "CLUB_ADMIN" | "ADMIN";

export interface IUser {
  email: string;
  passwordHash: string;
  name: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true },
    role: {
      type: String,
      enum: ["STUDENT", "CLUB_ADMIN", "ADMIN"],
      default: "STUDENT",
    },
  },
  { timestamps: true }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
