import bcrypt from "bcryptjs";
import { userRepo } from "@/server/users/user.repo";

export const authService = {
    async registerUser(data: {
            email: string;
            password: string;
            name: string;
        }) {
        const { email, password, name } = data;

        if (!email || !password || !name) {
            throw new Error("Missing required fields");
        }

        const exists = await userRepo.existsByEmail(email);
        if (exists) {
            throw new Error("User already exists");
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await userRepo.create({
            email,
            passwordHash,
            name,
            role: "STUDENT",
        });


        return {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
        };
    },

    async loginUser(email: string, password: string) {
        if (!email || !password) {
            throw new Error("Email and password required");
        }

        // 1. Find user
        const user = await userRepo.findByEmail(email);
        if (!user) {
            throw new Error("Invalid credentials");
        }

        // 2. Compare password
        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) {
            throw new Error("Invalid credentials");
        }

        // 3. Return safe user
        return {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
        };
    },
};
