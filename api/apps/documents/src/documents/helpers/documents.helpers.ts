import { ElectronicDocument } from "../entities/document.entity";

export function getShortDocumentData(document: ElectronicDocument) {
    return {
        id: document.id,
        title: document.title,
        createdAt: document.createdAt.toISOString()
    };
}
