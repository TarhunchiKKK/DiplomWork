import { create } from "zustand";

type TStore = {
    id: string | null;

    setVersionId: (_: string) => void;

    reset: () => void;
};

export const useCurrentDocumentStore = create<TStore>(set => ({
    id: null,

    setVersionId: id => set({ id }),

    reset: () => set({ id: null })
}));
