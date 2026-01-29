import { NextRequest, NextResponse } from "next/server";
import { clubService } from "./club.service";

export const clubController = {
  async createClub(req: NextRequest) {
    try {
      const body = await req.json();
      const { userId, name, description, logo, coverImage } = body;

      if (!userId) {
        return NextResponse.json(
          { error: "User ID is required" },
          { status: 400 }
        );
      }

      const club = await clubService.createClub(userId, {
        name,
        description,
        logo,
        coverImage,
      });

      return NextResponse.json(
        { success: true, data: club },
        { status: 201 }
      );
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
  },

  async joinClub(
    req: NextRequest,
    clubId: string
  ) {
    try {
      const body = await req.json();
      const { userId } = body;

      if (!userId || !clubId) {
        return NextResponse.json(
          { error: "UserId and ClubId required" },
          { status: 400 }
        );
      }

      const membership = await clubService.joinClub(userId, clubId);

      return NextResponse.json(
        { success: true, data: membership },
        { status: 200 }
      );
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
  },

  async leaveClub(
    req: NextRequest,
    clubId: string
  ) {
    try {
      const body = await req.json();
      const { userId } = body;

      if (!userId || !clubId) {
        return NextResponse.json(
          { error: "UserId and ClubId required" },
          { status: 400 }
        );
      }

      const result = await clubService.leaveClub(userId, clubId);

      return NextResponse.json(
        { success: true, data: result },
        { status: 200 }
      );
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
  },
};
