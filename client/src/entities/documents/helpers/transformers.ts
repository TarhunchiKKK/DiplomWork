import { DateFieldsToString } from "@/shared/api";
import { TDocumentShortData } from "../types";

export function transformDocumentShortData(document: DateFieldsToString<TDocumentShortData>): TDocumentShortData {
    return {
        ...document,
        createdAt: new Date(document.createdAt)
    };
}
