import { create } from "zustand";
import { TWithTempId } from "../../helpers";
import { TUpdateItemDto, TUpdatePostDto } from "./types";
import { generateTempId } from "../../helpers/temp-id";
import { generateDivisionTitle } from "./helpers";

type TPosts = TWithTempId<TUpdatePostDto>[];

export type TStore = {
    data: TWithTempId<Omit<TUpdateItemDto, "posts"> & { posts: TPosts }>[];

    divisions: {
        add: () => void;

        update: (tempId: string, title: string) => void;

        remove: (tempId: string) => void;
    };

    posts: {
        add: (divisionTempId: string) => void;

        update: (divisionTempId: string, postTempId: string, title: string) => void;

        remove: (divisionTempId: string, postTempId: string) => void;
    };
};

export const useDivisionsStore = create<TStore>(set => ({
    data: [],
    divisions: {
        add: () => {
            set(state => ({
                data: [
                    ...state.data,
                    {
                        title: generateDivisionTitle(state.data),
                        tempId: generateTempId(),
                        posts: [
                            {
                                title: "",
                                tempId: generateTempId()
                            }
                        ]
                    }
                ]
            }));
        },
        update: (tempId, title) => {
            set(state => ({
                data: state.data.map(division => (division.tempId === tempId ? { ...division, title } : division))
            }));
        },
        remove: tempId => {
            set(state => ({
                data: state.data.filter(division => division.tempId !== tempId)
            }));
        }
    },
    posts: {
        add: divisionTempId => {
            set(state => ({
                data: state.data.map(division =>
                    division.tempId === divisionTempId
                        ? {
                              ...division,
                              posts: [...division.posts, { title: "", tempId: generateTempId() }]
                          }
                        : division
                )
            }));
        },
        update: (divisionTempId, postTempId, title) => {
            set(state => ({
                data: state.data.map(division =>
                    division.tempId === divisionTempId
                        ? {
                              ...division,
                              posts: division.posts.map(post =>
                                  post.tempId! === postTempId ? { ...post, title } : post
                              )
                          }
                        : division
                )
            }));
        },
        remove: (divisionTempId, postTempId) => {
            set(state => ({
                data: state.data.map(division =>
                    division.tempId === divisionTempId
                        ? {
                              ...division,
                              posts: division.posts.filter(post => post.tempId !== postTempId)
                          }
                        : division
                )
            }));
        }
    }
}));
