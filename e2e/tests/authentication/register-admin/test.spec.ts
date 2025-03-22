import { test, expect } from "@playwright/test";
import { URLS } from "../../shared/constants";
import { invalidTestCases } from "./constants";
import { createValidResponseSchema } from "./schemas";
import { validationErrorSchema } from "../../shared/schemas/validation-error";
import { registerAdminDto } from "../../shared/dto";

test.describe("/auth/register/admin", () => {
    test.describe("Basic tests", () => {
        test("Test with valid dto", async ({ request }) => {
            const responseSchema = createValidResponseSchema();

            const response = await request.post(URLS.AUTH.REGISTER_ADMIN, {
                data: registerAdminDto
            });

            const result = responseSchema.safeParse(await response.json());

            expect(result.success).toBeTruthy();
        });
    });

    test.describe("Tests with invalid dto", () => {
        for (const testCase of invalidTestCases) {
            test(testCase.title, async ({ request }) => {
                const response = await request.post(URLS.AUTH.REGISTER_ADMIN, {
                    data: testCase.dto
                });

                const result = validationErrorSchema.safeParse(await response.json());

                expect(result.success).toBeTruthy();
            });
        }
    });
});
