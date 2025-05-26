import { create } from "zustand";

type TStore = {
    versionId: string | null;

    setVersionId: (_: string) => void;

    resetVersionId: () => void;
};

export const useCurrentDocumentStore = create<TStore>(set => ({
    versionId: null,

    setVersionId: versionId => set({ versionId }),

    resetVersionId: () => set({ versionId: null })
}));
