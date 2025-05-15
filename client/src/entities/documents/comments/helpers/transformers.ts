import { DateFieldsToString } from "@/shared/api";
import { TComment } from "../models";

export function transformComment(data: DateFieldsToString<TComment>): TComment {
    return {
        ...data,
        createdAt: new Date(data.createdAt)
    };
}
