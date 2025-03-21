import { Organization } from "../schemas/organization.schema";

export const defaultUrgencyInterval = 10 * 24 * 60 * 60 * 60;

export const defaulttOrganization: Organization = {
    settings: {
        documentStatuses: [
            {
                value: "aaa"
            }
        ],
        documentTypes: [
            {
                value: "bbb"
            }
        ],
        urgencyInterval: defaultUrgencyInterval
    }
};
