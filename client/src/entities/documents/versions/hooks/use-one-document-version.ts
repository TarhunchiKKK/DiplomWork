import { credentialsManager } from "@/features/auth";
import { DateFieldsToString, HttpHeadersBuilder, queryKeys, queryUrls } from "@/shared/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TVersion } from "../models";
import { transformVersion } from "../helpers";

export function useOneDocumentVersion(versionId: string) {
    return useQuery({
        queryKey: queryKeys.documents.versions.findOne(versionId),
        queryFn: async () => {
            const token = credentialsManager.jwt.get();

            const response = await axios.get<DateFieldsToString<TVersion>>(
                queryUrls.documents.versions.findOne(versionId),
                {
                    headers: new HttpHeadersBuilder().setBearerToken(token).build()
                }
            );
            return response.data;
        },
        select: transformVersion
    });
}
