import { create } from "zustand";
import { TProfile } from "../types";

const LOCAL_STORAGE_KEY = "profile";

const getInitialState = (): TProfile | null => {
    let profile = null;

    try {
        const value = localStorage.getItem(LOCAL_STORAGE_KEY);
        profile = value ? (JSON.parse(value) as TProfile) : null;
    } catch (_: unknown) {}

    return profile;
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
