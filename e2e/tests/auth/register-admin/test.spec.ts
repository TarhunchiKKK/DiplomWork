import { test, expect } from "@playwright/test";
import { URLS } from "../../shared/constants";
import { invalidTestCases, validDto } from "./constants";
import { createValidResponseSchema, invalidResponseSchema } from "./schemas";

test.describe("Admin creating", () => {
    test("Test with valid dto", async ({ request }) => {
        const responseSchema = createValidResponseSchema();

        const response = await request.post(URLS.AUTH.REGISTER_ADMIN, {
            data: validDto
        });

        const result = responseSchema.safeParse(await response.json());

        expect(result.success).toBeTruthy();
    });

    test.describe("Tests with invalid dto", () => {
        for (const testCase of invalidTestCases) {
            test(testCase.title, async ({ request }) => {
                const response = await request.post(URLS.AUTH.REGISTER_ADMIN, {
                    data: testCase.dto
                });

                const result = invalidResponseSchema.safeParse(await response.json());

                expect(result.success).toBeTruthy();
            });
        }
    });
});
