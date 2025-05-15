import { DateFieldsToString, HttpHeadersBuilder, queryKeys, queryUrls } from "@/shared/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TVersion } from "../models";
import { credentialsManager } from "@/features/auth";
import { transformVersion } from "../helpers";

export function useLastDocumentVersion(documentId: string) {
    const { data, isLoading } = useQuery({
        queryKey: queryKeys.documents.versions.findLast(documentId),
        queryFn: async () => {
            const token = credentialsManager.jwt.get();

            const response = await axios.get<DateFieldsToString<TVersion>>(
                queryUrls.documents.versions.findLast(documentId),
                {
                    headers: new HttpHeadersBuilder().setBearerToken(token).build()
                }
            );
            return response.data;
        },
        select: transformVersion
    });

    return { version: data, isLoading };
}
