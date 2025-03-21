import { CreateOrganizationDto } from "../dto/create-organization.dto";
import { defaultDocumentAims } from "./document-aims.constants";
import { defaultDocumentTypes } from "./document-types.constants";

const defaultUrgencyInterval = 10 * 24 * 60 * 60 * 60;

export const defaultOrganization: CreateOrganizationDto = {
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
