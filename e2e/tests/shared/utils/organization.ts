import { APIRequestContext } from "@playwright/test";
import { URLS } from "../constants";
import { registerAdminDto } from "../dto";

export async function getNewOrganization(request: APIRequestContext) {
    const response = await request.post(URLS.AUTH.REGISTER_ADMIN, {
        data: registerAdminDto
    });

    const json = await response.json();

    const organizationId = json.organizationId;

    return await getOrganization(request, organizationId);
}

export async function getOrganization(request: APIRequestContext, organizationId: string) {
    const response = await request.get(URLS.ORGANIZATIONS.FIND_ONE_BY_ID(organizationId));

    return await response.json();
}
