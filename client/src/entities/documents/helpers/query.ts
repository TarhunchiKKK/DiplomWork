import { authCredentialsManager } from "@/features/auth";
import { TQueryParams } from "../types";

export function createQueryKey(queryParams: TQueryParams) {
    const jwt = authCredentialsManager.jwt.get();

    return [jwt, queryParams.authorId, queryParams.aimId, queryParams.typeId, queryParams.isUrgent].filter(Boolean);
}
