import { DocumentsDisplayType } from "../../enums";

export const containerClassNames: Record<DocumentsDisplayType, string> = {
    [DocumentsDisplayType.ROWS]: "space-y-4",
    [DocumentsDisplayType.GRID]: ""
};

export const iconSizes: Record<DocumentsDisplayType, number> = {
    [DocumentsDisplayType.ROWS]: 24,
    [DocumentsDisplayType.GRID]: 56
};
