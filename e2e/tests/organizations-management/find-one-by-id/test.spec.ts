import test, { expect } from "@playwright/test";
import { getNewOrganization } from "../../shared/utils";
import { URLS } from "../../shared/constants";
import { invalidOrganizationId } from "./constants";
import { notFoundExceptionSchema } from "../../shared/schemas/not-found-exception";

test.describe("/organiztions/:id", () => {
    let organization: any = {};

    test.beforeEach(async ({ request }) => {
        organization = await getNewOrganization(request);
    });

    test("Test with existing organoization id", async ({ request }) => {
        const response = await request.get(URLS.ORGANIZATIONS.FIND_ONE_BY_ID(organization._id));

        const json = await response.json();

        expect(json._id).toBe(organization._id);
    });

    test("Test with not existing organization id ", async ({ request }) => {
        try {
            await request.get(URLS.ORGANIZATIONS.FIND_ONE_BY_ID(invalidOrganizationId));
        } catch (error: unknown) {
            const result = notFoundExceptionSchema.safeParse(error);
            expect(result.success).toBeTruthy();
        }
    });
});
