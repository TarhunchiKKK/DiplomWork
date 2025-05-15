import { DateFieldsToString } from "@/shared/api";
import { TVersion } from "../models";

export function transformVersion(data: DateFieldsToString<TVersion>): TVersion {
    return {
        ...data,
        createdAt: new Date(data.createdAt)
    };
}
