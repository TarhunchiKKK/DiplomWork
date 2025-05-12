import { authCredentialsManager } from "@/features/auth";
import { TQueryParams } from "../types";
import { queryKeys } from "@/shared/api";

export function createQueryKey(queryParams: TQueryParams) {
    const jwt = authCredentialsManager.jwt.get() as string;

    return queryKeys.documents
        .withJwt(jwt)
        .concat([queryParams.authorId, queryParams.aimId, queryParams.typeId, queryParams.isUrgent] as string[])
        .filter(Boolean) as string[];
}
