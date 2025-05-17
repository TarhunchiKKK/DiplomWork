import { DateFieldsToString } from "@/shared/api";
import { TApproval } from "../models";

export function transformApproval(data: DateFieldsToString<TApproval>): TApproval {
    return {
        ...data,
        createdAt: new Date(data.createdAt)
    };
}
