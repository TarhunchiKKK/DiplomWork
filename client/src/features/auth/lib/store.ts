import { Role } from "@/entities/users";
import { create } from "zustand";

type TProfile = {
    id: string;

    username?: string;

    email: string;

    role: Role;
};

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
