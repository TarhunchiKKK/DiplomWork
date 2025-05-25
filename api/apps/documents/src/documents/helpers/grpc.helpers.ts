import { ElectronicDocument } from "../entities/document.entity";
import { findLastVersion } from "./versions.helpers";

export const transformDocumentsArray = (documents: ElectronicDocument[]) => {
    return {
        documents: documents.map(document => ({
            id: document.id,
            title: document.title,
            createdAt: document.createdAt.toISOString()
        }))
    };
};

export const transfromOneDocument = (document: ElectronicDocument) => {
    return {
        ...document,
        lastVersionId: findLastVersion(document).id
    };
};
