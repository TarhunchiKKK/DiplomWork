import { credentialsManager } from "@/features/auth";
import { HttpHeadersBuilder, queryKeys, queryUrls } from "@/shared/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TFindCommentsResponse } from "../types";
import { transformComment } from "../helpers";

export function useDocumentComments(versionId: string) {
    return useQuery({
        queryKey: queryKeys.documents.comments.findAll(versionId),
        queryFn: async () => {
            const token = credentialsManager.jwt.get();

            const response = await axios.get<TFindCommentsResponse>(queryUrls.documents.comments.findAll(versionId), {
                headers: new HttpHeadersBuilder().setBearerToken(token).build()
            });
            return response.data.comments ?? [];
        },
        select: comments => comments.map(transformComment)
    });
}
