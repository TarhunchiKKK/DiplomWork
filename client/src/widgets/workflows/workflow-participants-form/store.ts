import { create } from "zustand";
import { TParticipantDto } from "./types";

type TStore = {
    approvers: TParticipantDto[];

    signerId: string | null;

    creatorId: string | null;

    setApprovers: (_: TParticipantDto[]) => void;

    setSignerId: (_: string | null) => void;

    setCreatorId: (_: string | null) => void;

    reset: () => void;
};

export const useParticipantsStore = create<TStore>(set => ({
    approvers: [],

    signerId: null,

    creatorId: null,

    setApprovers: approvers => set({ approvers }),

    setSignerId: signerId => set({ signerId }),

    setCreatorId: creatorId => set({ creatorId }),

    reset: () => set({ approvers: [], signerId: null })
}));
