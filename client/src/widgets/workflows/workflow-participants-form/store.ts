import { create } from "zustand";
import { TParticipantDto } from "./types";

type TStore = {
    approvers: TParticipantDto[];

    signer: TParticipantDto | null;

    setApprovers: (_: TParticipantDto[]) => void;

    setSigner: (_: TParticipantDto | null) => void;

    reset: () => void;
};

export const useParticipantsStore = create<TStore>(set => ({
    approvers: [],

    signer: null,

    setApprovers: approvers => set({ approvers }),

    setSigner: signer => set({ signer }),

    reset: () => set({ approvers: [], signer: null })
}));
