import { removeTempId } from "../../helpers";
import { TStore } from "./store";
import { TUpdateDto, TUpdateItemDto } from "./types";

export const generateDivisionTitle = (divisions: TUpdateItemDto[]) => {
    const count = divisions.length;
    return `Отдел ${count + 1}`;
};

export const trimStoreData = (data: TStore["data"]) => {
    return data.map(division =>
        removeTempId({
            ...division,
            posts: division.posts.filter(post => post.title).map(removeTempId)
        })
    );
};
