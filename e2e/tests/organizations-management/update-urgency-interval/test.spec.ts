import test, { expect } from "@playwright/test";
import { getNewOrganization, getOrganization } from "../../shared/utils";
import { URLS } from "../../shared/constants";
import { validationErrorTestCases, dto } from "./constants";
import { validationErrorSchema } from "../../shared/schemas";

test.describe("/organizations/urgency-interval", () => {
    test.describe("Tests with valid dto", () => {
        let organization: any = {};

        test.beforeEach(async ({ request }) => {
            organization = await getNewOrganization(request);
        });

        test("Valid test", async ({ request }) => {
            await request.patch(URLS.ORGANIZATIONS.UPDATE_URGENCY_INTERVAL, {
                data: {
                    organizationId: organization._id,
                    urgencyInterval: dto.urgencyInterval
                }
            });

            const updatedOrganization = await getOrganization(request, organization._id);

            expect(updatedOrganization.urgencyInterval.low).toBe(dto.urgencyInterval);
        });
    });

    test.describe("Tests with validation errors", () => {
        validationErrorTestCases.forEach(testCase => {
            test(testCase.title, async ({ request }) => {
                const response = await request.patch(URLS.ORGANIZATIONS.UPDATE_DOCUMENT_AIMS, {
                    data: testCase.data
                });

                const result = validationErrorSchema.safeParse(await response.json());

                expect(result.success).toBeTruthy();
            });
        });
    });
});
