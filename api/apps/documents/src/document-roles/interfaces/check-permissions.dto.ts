import { DocumentOperation } from "../enums/document-operation.enum";

export interface ICheckPermissionsDto {
    token: string;

    userId: string;

    operation: DocumentOperation;
}
