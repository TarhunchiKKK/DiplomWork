import { ENV } from "./env";

export const URLS = {
    AUTH: {
        REGISTER_ADMIN: `${ENV.SERVER_URL}/auth/register/admin`
    },
    ORGANIZATIONS: {
        FIND_ONE_BY_ID: (id: string) => `${ENV.SERVER_URL}/organizations/${id}`,
        UPDATE_URGENCY_INTERVAL: `${ENV.SERVER_URL}/organizations/urgency-interval`,
        UPDATE_DOCUMENT_AIMS: `${ENV.SERVER_URL}/organizations/document-aims`,
        UPDATE_DOCUMENT_TYPES: `${ENV.SERVER_URL}/organizations/document-types`,
        UPDATE_ADMINISTRATIVE_DIVISIONS: `${ENV.SERVER_URL}/organizations/administrative-divisions`
    }
};
