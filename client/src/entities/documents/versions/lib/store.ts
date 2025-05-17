import { create } from "zustand";

type TStore = {
    versionId: string | null;

    setVersionId: (_: string) => void;

    reset: () => void;
};

export const useCurrentDocumentStore = create<TStore>(set => ({
    versionId: null,

    setVersionId: versionId => set({ versionId }),

    reset: () => set({ versionId: null })
}));
