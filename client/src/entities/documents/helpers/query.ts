import { TQueryParams } from "../types";
import { queryKeys } from "@/shared/api";

export function createQueryKey(queryParams: TQueryParams) {
    return queryKeys.documents.findAll
        .concat([queryParams.aimId, queryParams.typeId, queryParams.isUrgent] as string[])
        .filter(Boolean) as string[];
}
