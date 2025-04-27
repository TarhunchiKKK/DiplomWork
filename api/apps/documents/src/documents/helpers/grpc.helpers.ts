import { ElectronicDocument } from "../entities/document.entity";

export const transformDocumentsArray = (documents: ElectronicDocument[]) => {
    return {
        documents: documents.map(document => ({
            id: document.id,
            title: document.title,
            createdAt: document.createdAt.toISOString()
        }))
    };
};
