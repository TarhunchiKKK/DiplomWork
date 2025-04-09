import { ICreateOrganizationDto } from "../dto/create-organization.dto";
import { defaultDocumentAims } from "./document-aims.constants";
import { defaultDocumentTypes } from "./document-types.constants";

const defaultUrgencyInterval = 10 * 24 * 60 * 60 * 60;

export const defaultOrganization: ICreateOrganizationDto = {
    urgencyInterval: defaultUrgencyInterval,

    documentAims: defaultDocumentAims.map(value => ({
        value
    })),

    documentTypes: defaultDocumentTypes.map(value => ({
        value
    })),
    administrativeDivisions: []
};
