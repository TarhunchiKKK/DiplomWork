import { TAdministrativeDivision } from "./administrative-division";
import { TDocumentAim } from "./document-aim";
import { TDocumentType } from "./document-type";

export type TOrganization = {
    _id: string;

    documentAims: TDocumentAim[];

    documentTypes: TDocumentType[];

    administrativeDivisions: TAdministrativeDivision[];
};
