import { DateFieldsToString } from "@/shared/api";

export type TDocumentShortData = {
    id: string;

    title: string;

    createdAt: Date;
};

export type TFindDocumentsResponse = {
    documents: DateFieldsToString<TDocumentShortData>[];
};
