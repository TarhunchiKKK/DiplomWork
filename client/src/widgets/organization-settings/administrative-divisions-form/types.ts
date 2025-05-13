import { TUpdatePostDto } from "./ui/single-division-form";

export type TUpdateDivisionDto = {
    _id?: string;

    title: string;

    posts: TUpdatePostDto[];
};
