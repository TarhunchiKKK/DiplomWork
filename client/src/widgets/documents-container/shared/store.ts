import { create } from "zustand";
import { DocumentsDisplayType } from "./enums";

const LOCAL_STORAGE_KEY = "documents_display_type";

type TStore = {
    displayType: DocumentsDisplayType;

    setDisplayType: (_: DocumentsDisplayType) => void;
};

export const useDisplayDocumentsStore = create<TStore>(set => ({
    displayType: <DocumentsDisplayType>localStorage.getItem(LOCAL_STORAGE_KEY) ?? DocumentsDisplayType.ROWS,

    setDisplayType: displayType => {
        localStorage.setItem(LOCAL_STORAGE_KEY, displayType);

        set({ displayType });
    }
}));
