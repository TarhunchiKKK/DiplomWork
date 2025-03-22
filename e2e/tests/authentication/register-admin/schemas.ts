import { registerAdminDto } from "../../shared/dto";
import { Role } from "../../shared/enums";
import { z } from "zod";

export function createValidResponseSchema() {
    return z.object({
        id: z.string().uuid(),
        username: z.literal(registerAdminDto.username),
        email: z.literal(registerAdminDto.email),
        role: z.literal(Role.ADMIN),
        organizationId: z.string(),
        token: z.string().jwt()
    });
}
