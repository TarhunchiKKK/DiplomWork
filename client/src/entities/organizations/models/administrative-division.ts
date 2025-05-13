import { TPost } from "./post";

export type TAdministrativeDivision = {
    _id: string;

    title: string;

    posts: TPost[];
};
