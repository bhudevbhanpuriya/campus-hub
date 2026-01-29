import { authController } from "@/server/auth/auth.controller";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return authController.login(req);
}
