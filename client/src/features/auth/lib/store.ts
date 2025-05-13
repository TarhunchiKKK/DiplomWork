import { create } from "zustand";
import { TProfile } from "../types";

type TStore = {
    profile: TProfile | null;

    setProfile: (_: TProfile) => void;

    resetProfile: () => void;
};

export const useProfileStore = create<TStore>(set => ({
    profile: null,

    setProfile: (profile: TProfile) => set({ profile }),

    resetProfile: () => set({ profile: null })
}));
