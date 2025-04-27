import { DocumentVersion } from "../entities/document-version.entity";

export const transformVersion = (version: DocumentVersion) => {
    return {
        ...version,
        createdAt: version.createdAt.toISOString()
    };
};

export const transfromVrsionsArray = (versions: DocumentVersion[]) => {
    return {
        versions: versions.map(version => ({
            id: version.id,
            url: version.url,
            description: version.description,
            createdAt: version.createdAt.toISOString()
        }))
    };
};
