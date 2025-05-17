import { create } from "zustand";

type TStore = {
    versionId: string | null;

    documentId: string | null;

    setVersionId: (_: string) => void;

    setDocumentId: (_: string) => void;

    reset: () => void;
};

export const useCurrentVersionStore = create<TStore>(set => ({
    versionId: null,

    documentId: null,

    setVersionId: versionId => set({ versionId }),

    setDocumentId: documentId => set({ documentId }),

    reset: () => set({ versionId: null, documentId: null })
}));
