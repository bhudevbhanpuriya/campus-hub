import { authController } from "@/server/auth/auth.controller";

export async function POST(req:Request) {
    return authController.register(req as any)
}