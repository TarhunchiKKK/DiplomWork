import { credentialsManager } from "@/features/auth";
import { queryKeys, queryUrls, HttpHeadersBuilder } from "@/shared/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TFindDocumentsResponse, transformDocumentShortData } from "../../shared";

export function useMyDocuments() {
    const token = credentialsManager.jwt.get() as string;

    const { data, isLoading } = useQuery({
        queryKey: queryKeys.documents.my,
        queryFn: async () => {
            const response = await axios.get<TFindDocumentsResponse>(queryUrls.documents.my.findAll, {
                headers: new HttpHeadersBuilder().setBearerToken(token).build()
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
