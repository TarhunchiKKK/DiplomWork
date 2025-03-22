import test, { expect } from "@playwright/test";
import { getNewOrganization, getOrganization } from "../../shared/utils";
import { URLS } from "../../shared/constants";
import { fullUpdateDto, validationErrorTestCases, patchUpdateDto } from "./constants";
import { validationErrorSchema } from "../../shared/schemas";

test.describe("/organiztions/administrative-divisions", () => {
    test.describe("Tests with valid dtos", () => {
        let organization: any = {};

        test.beforeEach(async ({ request }) => {
            organization = await getNewOrganization(request);
        });

        test("Test with full update", async ({ request }) => {
            await request.patch(URLS.ORGANIZATIONS.UPDATE_ADMINISTRATIVE_DIVISIONS, {
                data: {
                    organizationId: organization._id,
                    administrativeDivisions: fullUpdateDto
                }
            });

            const updatedOrganization = await getOrganization(request, organization._id);

            updatedOrganization.administrativeDivisions.forEach((administrativedivision, index) => {
                expect(administrativedivision.title).toBe(fullUpdateDto[index].title);
            });
        });

        test("Test with patch update ", async ({ request }) => {
            await request.patch(URLS.ORGANIZATIONS.UPDATE_ADMINISTRATIVE_DIVISIONS, {
                data: {
                    organizationId: organization._id,
                    administrativeDivisions: fullUpdateDto
                }
            });

            organization = await getOrganization(request, organization._id);

            await request.patch(URLS.ORGANIZATIONS.UPDATE_ADMINISTRATIVE_DIVISIONS, {
                data: {
                    organizationId: organization._id,
                    administrativeDivisions: organization.administrativeDivisions.map((dto, index) => ({
                        _id: dto._id,
                        ...patchUpdateDto[index]
                    }))
                }
            });

            const updatedOrganization = await getOrganization(request, organization._id);

            updatedOrganization.administrativeDivisions.forEach((administrativedivision, index) => {
                expect(administrativedivision._id).toBe(organization.administrativeDivisions[index]._id);
                expect(administrativedivision.title).toBe(patchUpdateDto[index].title);
            });
        });
    });

    test.describe("Tests with validation errors", () => {
        validationErrorTestCases.forEach(testCase => {
            test(testCase.title, async ({ request }) => {
                const response = await request.patch(URLS.ORGANIZATIONS.UPDATE_ADMINISTRATIVE_DIVISIONS, {
                    data: testCase.data
                });

                const result = validationErrorSchema.safeParse(await response.json());

                expect(result.success).toBeTruthy();
            });
        });
    });
});
