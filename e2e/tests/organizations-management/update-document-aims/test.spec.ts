import test, { expect } from "@playwright/test";
import { getNewOrganization, getOrganization } from "../../shared/utils";
import { URLS } from "../../shared/constants";
import { fullUpdateDto, validationErrorTestCases, patchUpdateDto } from "./constants";
import { validationErrorSchema } from "../../shared/schemas";

test.describe("/organizations/document-aims", () => {
    test.describe("Tests with valid dtos", () => {
        let organization: any = {};

        test.beforeEach(async ({ request }) => {
            organization = await getNewOrganization(request);
        });

        test("Test with full update", async ({ request }) => {
            await request.patch(URLS.ORGANIZATIONS.UPDATE_DOCUMENT_AIMS, {
                data: {
                    organizationId: organization._id,
                    documentAims: fullUpdateDto
                }
            });

            const updatedOrganization = await getOrganization(request, organization._id);

            updatedOrganization.documentAims.forEach((documentAim, index) => {
                expect(documentAim.value).toBe(fullUpdateDto[index].value);
            });
        });

        test("Test with patch update ", async ({ request }) => {
            await request.patch(URLS.ORGANIZATIONS.UPDATE_DOCUMENT_AIMS, {
                data: {
                    organizationId: organization._id,
                    documentAims: organization.documentAims.map((dto, index) => ({
                        _id: dto._id,
                        value: patchUpdateDto[index].value
                    }))
                }
            });

            const updatedOrganization = await getOrganization(request, organization._id);

            updatedOrganization.documentAims.forEach((documentAim, index) => {
                expect(documentAim._id).toBe(organization.documentAims[index]._id);
                expect(documentAim.value).toBe(patchUpdateDto[index].value);
            });
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
