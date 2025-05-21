import { create } from "zustand";
import { TProfile } from "../types";

const LOCAL_STORAGE_KEY = "profile";

const getInitialState = (): TProfile | null => {
    const profile = localStorage.getItem(LOCAL_STORAGE_KEY);
    return profile ? JSON.parse(profile) : null;
};

type TStore = {
    profile: TProfile | null;

    setProfile: (_: TProfile) => void;

    resetProfile: () => void;
};

export const useProfileStore = create<TStore>(set => ({
    profile: getInitialState(),

    setProfile: (profile: TProfile) => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profile));
        set({ profile });
    },

    resetProfile: () => {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        set({ profile: null });
    }
}));
