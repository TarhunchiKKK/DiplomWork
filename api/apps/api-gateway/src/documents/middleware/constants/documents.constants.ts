import { DocumentOperation } from "../enums/document-operation.enum";
import { DocumentRole } from "../enums/document-role.enum";

export const documentPermissions: Record<DocumentRole, DocumentOperation[]> = {
    [DocumentRole.AUTHOR]: [
        DocumentOperation.UPDATE,
        DocumentOperation.READ,
        DocumentOperation.CREATE_VERSION,
        DocumentOperation.COMMENT
    ],
    [DocumentRole.REGULAR]: [DocumentOperation.READ, DocumentOperation.COMMENT]
};
