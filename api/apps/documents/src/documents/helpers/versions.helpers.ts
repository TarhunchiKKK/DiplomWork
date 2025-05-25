import { ElectronicDocument } from "../entities/document.entity";

export const findLastVersion = (document: ElectronicDocument) => {
    return document.versions.reduce((latest, version) => {
        if (!latest || version.createdAt > latest.createdAt) {
            return version;
        }
        return latest;
    }, null);
};
