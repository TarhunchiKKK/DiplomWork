import { DateFieldsToString } from "@/shared/api";
import { TNotification } from "../models";

export function transformNotification(data: DateFieldsToString<TNotification>): TNotification {
    return {
        ...data,
        createdAt: new Date(data.createdAt)
    };
}
