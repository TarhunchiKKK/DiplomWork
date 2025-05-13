export type TDocumentShortData = {
    id: string;

    title: string;

    createdAt: Date;
};

export type TDocument = {
    id: string;

    title: string;

    typeId: string;

    aimId: string;

    isUrgent: boolean;

    authorId: string;
};
