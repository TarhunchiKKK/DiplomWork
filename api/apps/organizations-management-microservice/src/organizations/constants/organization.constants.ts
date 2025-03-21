import { Organization } from "../schemas/organization.schema";
import { defaultDocumentAims } from "./document-aims.constants";
import { defaultDocumentTypes } from "./document-types.constants";

const defaultUrgencyInterval = 10 * 24 * 60 * 60 * 60;

export const defaulttOrganization: Organization = {
    settings: {
        urgencyInterval: defaultUrgencyInterval,

        documentAims: defaultDocumentAims.map(value => ({
            value
        })),

        documentTypes: defaultDocumentTypes.map(value => ({
            value
        })),
        administrativeDivisions: []
    }
};
