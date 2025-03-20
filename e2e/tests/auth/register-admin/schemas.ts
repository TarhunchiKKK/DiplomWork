import { Role } from "../../shared/enums";
import { validDto } from "./constants";
import { z } from "zod";

export function createValidResponseSchema() {
    return z.object({
        id: z.string().uuid(),
        username: z.literal(validDto.username),
        email: z.literal(validDto.email),
        role: z.literal(Role.ADMIN),
        organizationId: z.string(),
        token: z.string().jwt()
    });
}

export const invalidResponseSchema = z.object({
    message: z.array(z.string()),
    error: z.literal("Bad Request"),
    statusCode: z.literal(400)
});
