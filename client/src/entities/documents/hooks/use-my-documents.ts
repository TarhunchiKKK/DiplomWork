import { authCredentialsManager } from "@/features/auth";
import { queryKeys, queryUrls, HttpHeadersBuilder } from "@/shared/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { transformDocumentShortData } from "../helpers";
import { TFindDocumentsResponse } from "../types";

export function useMyDocuments() {
    const token = authCredentialsManager.jwt.get() as string;

    const { data, isLoading } = useQuery({
        queryKey: queryKeys.documents.my(token),
        queryFn: async () => {
            const response = await axios.get<TFindDocumentsResponse>(queryUrls.documents.my.findAll, {
                headers: new HttpHeadersBuilder().setBearerToken(token).get()
            });
            return response.data.documents;
        },
        select: documents => documents.map(transformDocumentShortData)
    });

    return {
        documents: data,
        isLoading
    };
}
