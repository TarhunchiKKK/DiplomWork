import test, { expect } from "@playwright/test";
import { getNewOrganization, getOrganization } from "../../shared/utils";
import { URLS } from "../../shared/constants";
import { fullUpdateDto, validationErrorTestCases, patchUpdateDto } from "./constants";
import { validationErrorSchema } from "../../shared/schemas";

test.describe("/organizations/document-types", () => {
    test.describe("Tests with invalid dtos", () => {
        let organization: any = {};

        test.beforeEach(async ({ request }) => {
            organization = await getNewOrganization(request);
        });

        test("Test with full update", async ({ request }) => {
            await request.patch(URLS.ORGANIZATIONS.UPDATE_DOCUMENT_TYPES, {
                data: {
                    organizationId: organization._id,
                    documentTypes: fullUpdateDto
                }
            });

            const updatedOrganization = await getOrganization(request, organization._id);

            updatedOrganization.documentTypes.forEach((documentType, index) => {
                expect(documentType.value).toBe(fullUpdateDto[index].value);
            });
        });

        test("Test with patch update ", async ({ request }) => {
            await request.patch(URLS.ORGANIZATIONS.UPDATE_DOCUMENT_TYPES, {
                data: {
                    organizationId: organization._id,
                    documentTypes: organization.documentTypes.map((dto, index) => ({
                        _id: dto._id,
                        value: patchUpdateDto[index].value
                    }))
                }
            });

            const updatedOrganization = await getOrganization(request, organization._id);

            updatedOrganization.documentTypes.forEach((documentType, index) => {
                expect(documentType._id).toBe(organization.documentTypes[index]._id);
                expect(documentType.value).toBe(patchUpdateDto[index].value);
            });
        });
    });

    test.describe("Tests with validation errors", () => {
        validationErrorTestCases.forEach(testCase => {
            test(testCase.title, async ({ request }) => {
                const response = await request.patch(URLS.ORGANIZATIONS.UPDATE_DOCUMENT_TYPES, {
                    data: testCase.data
                });

                const result = validationErrorSchema.safeParse(await response.json());

                expect(result.success).toBeTruthy();
            });
        });
    });
});
