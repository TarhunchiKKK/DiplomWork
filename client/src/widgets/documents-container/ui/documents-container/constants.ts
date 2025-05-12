import { DocumentsDisplayType } from "../../enums";

export const wrapperClassNames: Record<DocumentsDisplayType, string> = {
    [DocumentsDisplayType.ROWS]: "",
    [DocumentsDisplayType.GRID]: ""
};

export const imageSizes: Record<DocumentsDisplayType, number> = {
    [DocumentsDisplayType.ROWS]: 24,
    [DocumentsDisplayType.GRID]: 56
};
