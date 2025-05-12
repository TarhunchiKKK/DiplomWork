import { ReactNode } from "react";
import { DocumentsDisplayType } from "../../enums";
import { TSIngleItemProps } from "./types";
import { DocumentsGridItem, DocumentsRowItem } from "./ui";

export const containerClassNames: Record<DocumentsDisplayType, string> = {
    [DocumentsDisplayType.ROWS]: "space-y-4",
    [DocumentsDisplayType.GRID]: "grid grid-cols-8 gap-6"
};

export const iconSizes: Record<DocumentsDisplayType, number> = {
    [DocumentsDisplayType.ROWS]: 24,
    [DocumentsDisplayType.GRID]: 56
};

export const documentsItems: Record<DocumentsDisplayType, (_: TSIngleItemProps) => ReactNode> = {
    [DocumentsDisplayType.ROWS]: DocumentsRowItem,
    [DocumentsDisplayType.GRID]: DocumentsGridItem
};
