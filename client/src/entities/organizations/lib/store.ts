import { create } from "zustand";
import { TDocumentType, TOrganization } from "../types";

type TStore = {
    organization: TOrganization | {};

    setUrgencyInterval: (_: number) => void;

    setDocumentTypes: (_: TDocumentType[]) => void;
};

export const useOrganizationStore = create<TStore>(set => ({
    organization: {},

    setUrgencyInterval: interval => {
        set(state => ({
            organization: {
                ...state.organization,
                urgencyInterval: interval
            }
        }));
    },

    setDocumentTypes: documentTypes => {
        set(state => ({
            organization: {
                ...state.organization,
                documentTypes
            }
        }));
    }
}));
