import { DateFieldsToString } from "@/shared/api";
import { TComment } from "../models";

export type TFindCommentsResponse = {
    comments: DateFieldsToString<TComment>[];
};
