import { DateFieldsToString } from "@/shared/api";
import { TDocumentShortData } from "./document";

export type TQueryParams = {
    authorId?: string;

    typeId?: string;

    aimId?: string;

    isUrgent?: boolean;
};

export type TFindDocumentsResponse = {
    documents: DateFieldsToString<TDocumentShortData>[];
};
