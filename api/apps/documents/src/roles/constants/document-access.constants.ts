import { DocumentOperation } from "../enums/document-operation.enum";
import { DocumentRole } from "../enums/document-role.enum";

export const documentPermissions: Record<DocumentRole, DocumentOperation[]> = {
    [DocumentRole.AUTHOR]: [
        DocumentOperation.UPDATE_INFO,
        DocumentOperation.UPDATE_FILE,
        DocumentOperation.COMMENTING,
        DocumentOperation.READ_FILE
    ],
    [DocumentRole.REGULAR]: [DocumentOperation.COMMENTING, DocumentOperation.READ_FILE]
};
