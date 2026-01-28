import { clubRepo } from "./club.repo";
import { clubMemberRepo } from "./clubmember.repo";
import { ClubRole } from "../models/clubMember.model";
import mongoose from "mongoose";

export const clubService = {
  async createClub(
    userId: string,
    data: {
      name: string;
      description: string;
      logo?: string;
      coverImage?: string;
    }
  ) {
    const { name, description, logo, coverImage } = data;

    if (!name || !description) {
      throw new Error("Missing required fields");
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid user id");
    }

    const exists = await clubRepo.findByName(name);
    if (exists) {
      throw new Error("Club already exists");
    }
    const club = await clubRepo.createClub({
      name,
      description,
      logo,
      coverImage,
      membersCount: 1,
    });

    await clubMemberRepo.addMember({
      userId: new mongoose.Types.ObjectId(userId),
      clubId: club._id,
      role: "CLUB_ADMIN",
      joinedAt: new Date(),
    });

    return {
      id: club._id,
      name: club.name,
      description: club.description,
      membersCount: club.membersCount,
    };
  },

  async joinClub(userId: string, clubId: string) {
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(clubId)) {
      throw new Error("Invalid ID format");
    }
    const existing = await clubMemberRepo.findMembership(userId, clubId);
    if (existing) {
      throw new Error("User already a member of this club");
    }

    const membership = await clubMemberRepo.addMember({
      userId: new mongoose.Types.ObjectId(userId),
      clubId: new mongoose.Types.ObjectId(clubId),
      role: "STUDENT",
      joinedAt: new Date(),
    });

    await clubRepo.incrementMemberCount(clubId);

    return {
      userId: membership.userId,
      clubId: membership.clubId,
      role: membership.role,
      joinedAt: membership.joinedAt,
    };
  },

  async leaveClub(userId: string, clubId: string) {
    if (mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(clubId)) {
      throw new Error("Invalid ID format");
    }

    const result = await clubMemberRepo.removeMember(userId, clubId);
    if (!result.success) {
      throw new Error(result.message);
    }

    await clubRepo.decrementMemberCount(clubId);

    return { success: true };
  },

  async isClubAdmin(userId: string, clubId: string): Promise<boolean> {
    if (!mongoose.Types.ObjectId.isValid(userId) ||!mongoose.Types.ObjectId.isValid(clubId)) {
      return false;
    }

    const member = await clubMemberRepo.findMembership(userId, clubId);
    if (!member) return false;

    return member.role === "CLUB_ADMIN";
  },
};
