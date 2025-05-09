import { create } from "zustand";
import { TUpdateDivisionDto } from "./types";

type TStore = {
    divisions: TUpdateDivisionDto[];

    setData: (_: TUpdateDivisionDto[]) => void;

    setDivision: (_: TUpdateDivisionDto) => void;

    setTitle: (title: string, index: number) => void;
};

export const useDivisionsStore = create<TStore>(set => ({
    divisions: [],

    setData: divisions => set({ divisions }),

    setDivision: division => {
        set(state => {
            const index = state.divisions.findIndex(d => d.title === division.title);

            if (index == -1) {
                return { divisions: [...state.divisions, division] };
            } else {
                return {
                    divisions: [...state.divisions.slice(0, index), division, ...state.divisions.slice(index + 1)]
                };
            }
        });
    },

    setTitle: (title, index) => {
        set(state => {
            const division = state.divisions[index];
            return {
                divisions: [
                    ...state.divisions.slice(0, index),
                    { ...division, title },
                    ...state.divisions.slice(index + 1)
                ]
            };
        });
    }
}));
