import { z } from "zod";

export const validationErrorSchema = z.object({
    message: z.array(z.string()),
    error: z.literal("Bad Request"),
    statusCode: z.literal(400)
});
