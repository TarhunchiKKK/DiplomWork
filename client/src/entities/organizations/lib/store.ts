import { create } from "zustand";
import { TOrganization } from "../types";

type TStore = {
    organization: TOrganization | {};

    setUrgencyInterval: (_: number) => void;
};

export const useOrganizationStore = create<TStore>(set => ({
    organization: {},

    setUrgencyInterval: interval =>
        set((state: NonNullable<TStore>) => ({
            organization: {
                ...state.organization,
                urgencyInterval: interval
            }
        }))
}));
