type TDocumentRequestData = {
    type: "Document";

    userId: string;

    documentId: string;
};

type TVersionRequestData = {
    type: "Version";

    userId: string;

    versionId: string;
};

export type TRequestData = TDocumentRequestData | TVersionRequestData;
