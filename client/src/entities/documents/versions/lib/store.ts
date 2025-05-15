import { create } from "zustand";

type TStore = {
    id: string | null;

    setCurrentVersion: (_: string) => void;

    resetCurrentVersion: () => void;
};

export const useCurrentVersionStore = create<TStore>(set => ({
    id: null,

    setCurrentVersion: (id: string) => set({ id }),

    resetCurrentVersion: () => set({ id: null })
}));
