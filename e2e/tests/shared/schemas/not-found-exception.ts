import { z } from "zod";

export const notFoundExceptionSchema = z.object({
    massage: z.literal("Not Found"),
    statusCode: z.literal(404)
});
