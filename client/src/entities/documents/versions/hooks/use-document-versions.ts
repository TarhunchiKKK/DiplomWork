import { credentialsManager } from "@/features/auth";
import { HttpHeadersBuilder, queryKeys, queryUrls } from "@/shared/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TFindVersionsResponse } from "../types";
import { transformVersion } from "../helpers";

export function useDocumentVersions(documentId: string) {
    const { data, isLoading } = useQuery({
        queryKey: queryKeys.documents.versions.findAll(documentId),
        queryFn: async () => {
            const token = credentialsManager.jwt.get();

            const response = await axios.get<TFindVersionsResponse>(queryUrls.documents.versions.findAll(documentId), {
                headers: new HttpHeadersBuilder().setBearerToken(token).build()
            });

            return response.data.versions ?? [];
        },
        select: versions => versions.map(transformVersion)
    });

    return { versions: data, isLoading };
}
